module.exports = {
	name: 'mockWideCaps',
    description: 'Mock someone and make a sentence have extra spaces AND be all caps!',
    aliases: ['mwc'],
    guildOnly: false,
    usage: '<req: string to mock>',
    cooldown: 1,
	execute(message, args) {
        //check if it's a letter
        function isALetter(char) {
            return (/[a-zA-Z]/).test(char)
        }

        let msg = args.join(" ");
        let result = "";

        //alternate between upper and lowercase 
        for(let i = 0; i < msg.length; i++) {
            result += msg[i].toUpperCase();
            result += " ";
        }

        message.channel.send(result);
	},
};