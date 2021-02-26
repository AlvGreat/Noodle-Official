module.exports = {
	name: 'mock',
    description: 'Mock someone by alternating a sentence into upper/lowercase!',
    aliases: [],
    guildOnly: false,
    usage: '<req: string to mock>',
    cooldown: 1,
	execute(message, args) {
        if(!args[0]) return message.channel.send("yOu hAvE To gIvE Me sOmEtHiNg tO MoCk");
        
        //check if it's a letter
        function isALetter(char) {
            return (/[a-zA-Z]/).test(char)
        }

        let msg = args.join(" ");
        let result = "";

        //alternate between upper and lowercase 
        for(let i = 0; i < msg.length; i++) {
            if(i % 2 == 1 && isALetter(msg[i])) {
                result += msg[i].toUpperCase();
            }
            else {
                result += msg[i].toLowerCase();
            }
        }

        message.channel.send(result);
	},
};