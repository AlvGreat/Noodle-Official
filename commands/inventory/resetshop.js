const mysql = require("mysql");
const { prefix } = require('../../config.json');
const w = require("../../items.js");

module.exports = {
	name: 'resetshop',
    description: `Resets the shop so that you can buy more boxes! Can be used every 6 hours.`,
    aliases: ["rs"],
    guildOnly: true,
    cooldown: 21600,
	execute(message, args, con) {        
        con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id}`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("Something went wrong :("); 
            } 

            con.query(`UPDATE Noodle SET boxesBought = 0 WHERE id = ${message.author.id}`);
            message.reply(`Your shop has been reset and you can buy more boxes!`);
        })
	},
};