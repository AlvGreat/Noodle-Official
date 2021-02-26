module.exports = {
	name: 'emoji',
    description: 'Send cool animated emojis',
    aliases: [],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	execute(message, args) {
        //if(message.author.id === "500733754264911880") return;
        // delete the sent message
        message.delete();

        // allow a user to send multiple emojis in one message
        function copyString(str, times) {
            let result = "";

            for(let i = 0; i < times; i++) {
                result += str + " ";
            }
            return result;
        }

        // if they don't provide an argument
        if(args.length < 1) return message.channel.send("Please provide an emoji name! Accepted arguments: 'axolotl', 'rainbow'");

        // user can specify how many times to send the emoji 
        let count = 1;
        if(!isNaN(args[1])) count = args[1];
        
        // set a limit on how large the count can be
        if(count > 25) count = 25; 
        if(count < 1) count = 1;

        if(args[0] == "axolotl") {
            message.channel.send(copyString("<a:axolotl_gif:814705817273892915>", count));
        }
        else if(args[0] == "bonk") {
            message.channel.send(copyString("<a:LuisDiesOfBonk:814711350344286209>", count));
        }
        else if(args[0] == "rainbow") {
            message.channel.send(copyString('<a:rainbow_blob:814702559222300753>', count));
        }        
        else {
            return message.channel.send("Please provide an emoji name! Accepted arguments: 'axolotl', 'rainbow'");
        }
	},
};