const w = require("../../../items.js");

const mysql = require("mysql");
const { prefix } = require('../../../config.json');

module.exports = {
	name: 'testweap',
    description: `[for testing]`,
    aliases: ["tw"],
    guildOnly: true,
    cooldown: 1,
	execute(message, args, con) {        
        if(message.author.id != "304393518816952321") return message.channel.send("This command is only for owner testing purposes.");
        console.log(w.allItemsNames);
	},
};