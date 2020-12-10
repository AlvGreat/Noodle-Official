const { prefix } = require('../config.json');

module.exports = {
	name: 'scramble',
    description: `Scrambles the middle letters of words in a sentence. Try it out with ${prefix}scramble [arguments]`,
    aliases: ["sc"],
    guildOnly: false,
    usage: '[req: string]',
    cooldown: 1,
	execute(message, args) {
        if (!args[0]) return message.reply("You have to give me something to scramble!");

        let spl = args;
        message.delete(); 

        for (let i = 0; i < spl.length; i++) {
            if (spl[i].length > 3) {
                spl[i] = scrambleWord(spl[i]);
            }
        }

        let ans = spl.join(" ");
        message.channel.send(`> "${ans}" - ${message.author}`);

        function scrambleWord(word) {
            let spl = word.split("");
            let newPos;
            let temp;

            for (let i = 1; i < spl.length - 1; i++) {
                newPos = Math.floor(Math.random() * (spl.length - 2)) + 1;
                temp = spl[i];
                spl[i] = spl[newPos];
                spl[newPos] = temp;
            }

            let ans = spl.join("");
                return ans;
        }
	},
};
