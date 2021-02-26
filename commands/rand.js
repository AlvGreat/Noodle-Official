const { prefix } = require('../config.json');

module.exports = {
	name: 'rand',
    description: `Get a random number/integer! Example usage is "${prefix}rand 2 5", which will return a random number in the range of [2, 5], inclusive. Default starts at 1 if you don't provide a starting number.`,
    aliases: [],
    guildOnly: false,
    usage: '[opt: starting number, default 1] <req: ending number>',
    cooldown: 1,
	execute(message, args) {
        if(args.length != 2 && args.length != 1) return message.channel.send(`Please use the command correctly! ${prefix}rand [optional start number] [end number]`);
        
        let start = 1;
        let end = 0;
        if(args.length == 2) {
            start = parseInt(Math.floor(args[0]));
            end = parseInt(Math.floor(args[1]));
        }
        else {
            end = parseInt(Math.floor(args[0]));
        }

        if(isNaN(start) || isNaN(end)) return message.channel.send("That is an invalid number! Please try again");
        if(start > end) return message.channel.send("The start of the interval can't be greater than the end. Please try again");

        const result = Math.floor(Math.random() * (end - start + 1)) + start;
        message.channel.send(`In [${start}, ${end}], your random number is: ${result}`)
	},
};