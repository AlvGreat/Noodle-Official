const mysql = require("mysql");
const { prefix } = require('../../config.json');
const w = require("../../items.js");

module.exports = {
	name: 'hourlybox',
    description: `Obtain a random weapon to attack other users with! Obtained weapon level: Tier 1`,
    aliases: ["hbox"],
    guildOnly: true,
    cooldown: 3600,
	execute(message, args, con) {        
        con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id}`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("Something went wrong :("); 
            } 
            
            let rand = Math.floor(Math.random() * w.tier1.length);
            let weapon = w.tier1[rand].name;

            con.query(`UPDATE Noodle SET ${weapon} = ${weapon} + 1 WHERE id = ${message.author.id}`);
            message.reply(`You got a ${weapon} out of your hourly box!`);
        })
	},
};
