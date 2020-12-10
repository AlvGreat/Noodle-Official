const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'multiplier',
    description: `Check someone's multiplier! buy one with ${prefix}mbuy`,
    aliases: ["mp"],
    guildOnly: true,
    usage: '<opt: user>',
    cooldown: 1.5,
	execute(message, args, con) {        
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        let target = message.mentions.users.first() || message.author;


       con.query(`SELECT * FROM Noodle WHERE id = '${target.id}'`, (err, rows) => {

           if (err) throw err;

           if(!rows[0]) return message.channel.send("This user has not used the currency system yet!");

           let multiplier = rows[0].multiplier; 
           multiplier *= 100;

           if (rows[0].badge4 == 0 && multiplier > 145) {
               con.query(`UPDATE Noodle SET badge4 = 1 WHERE id = ${target.id}`);
               message.channel.send(`<@${target.id}>, you have unlocked a new badge! Use ${prefix}profile to see it!`);
           }
           

           message.channel.send("<@" + target + "> has a " + multiplier.toFixed(3) + "% multiplier :tada:");
       });
	},
};