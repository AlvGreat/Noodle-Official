const { prefix } = require('../config.json');

module.exports = {
	name: 'morse',
    description: `Decode a morse code message! Usage: ${prefix}morse [message]`,
    aliases: [],
    guildOnly: false,
    cooldown: 1,
	execute(message, args) {
        let msg = args.join(" ");

        const alphabet = {
            "-----":"0",
            ".----":"1",
            "..---":"2",
            "...--":"3",
            "....-":"4",
            ".....":"5",
            "-....":"6",
            "--...":"7",
            "---..":"8",
            "----.":"9",
            ".-":"a",
            "-...":"b",
            "-.-.":"c",
            "-..":"d",
            ".":"e",
            "..-.":"f",
            "--.":"g",
            "....":"h",
            "..":"i",
            ".---":"j",
            "-.-":"k",
            ".-..":"l",
            "--":"m",
            "-.":"n",
            "---":"o",
            ".--.":"p",
            "--.-":"q",
            ".-.":"r",
            "...":"s",
            "-":"t",
            "..-":"u",
            "...-":"v",
            ".--":"w",
            "-..-":"x",
            "-.--":"y",
            "--..":"z",
            "/":" ",
            "-·-·--":"!",
            "·-·-·-":".",
            "--··--":","
        };
        let messageConverted = [];

        msg.split(" ").map(function (letter) {
            messageConverted.push(alphabet[letter]);
        });

        message.channel.send("Your decoded message is:\n\n" + messageConverted.join(""));

	},
};
