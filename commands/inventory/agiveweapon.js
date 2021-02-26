const mysql = require("mysql");
const { prefix } = require('../../config.json');
const w = require("../../items.js");

module.exports = {
	name: 'agiveweapon',
    description: `[for testing] Obtain a random weapon to attack other users with! Obtained weapon level: true random`,
    aliases: ["agweapon", "agw"],
    guildOnly: true,
    cooldown: 0,
	execute(message, args, con) {        
        let Alv = "304393518816952321";
        let Luis = "252536683944214531";

        if(message.author.id != Alv /* && message.author.id != Luis */ ) return;

        let errorMsg = `Something went wrong. Usage: ${prefix}agw @user [weapon] [amt]`;

        if (!message.mentions.users.first()) return message.channel.send(errorMsg);
        let target = message.mentions.users.first();
        
        if(!args[1]) return message.channel.send(errorMsg);
        const weapon = args[1];

        if(!args[2]) return message.channel.send(errorMsg);
        const amount = args[2];
        if (isNaN(amount)) return message.channel.send(errorMsg);

        const stuff = w.allItemsNames;
        if (stuff.indexOf(weapon) < 0) return message.channel.send(`Invalid argument provided.`);

        con.query(`SELECT * FROM Noodle WHERE id = ${target.id}`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("Something went wrong :("); 
            } 
            
            con.query(`UPDATE Noodle SET ${weapon} = ${weapon} + ${amount} WHERE id = '${target.id}'`);
            message.channel.send(`<@${message.author.id}> gave <@${target.id}> ${amount} ${weapon}s using admin permissions!`);
        })
	},
};