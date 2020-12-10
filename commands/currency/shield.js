const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'shield',
    description: `Check someone's shield! buy one with ${prefix}sbuy`,
    aliases: [],
    guildOnly: true,
    cooldown: 1.5,
	execute(message, args, con) {        
        let target = message.mentions.users.first() || message.author;

       con.query(`SELECT * FROM Noodle WHERE id = '${target.id}'`, (err, rows) => {
           if (err) throw err;

           if(!rows[0]) return message.channel.send("This user has not used the currency system yet!");
           
           if (rows[0].shield == 1) {
               message.channel.send(`${target} has a shield active!`);
           }
           else if (rows[0].shield == 2) {
               message.channel.send(`${target} has an upgraded shield active!`);
           }
           else {
               message.channel.send(`${target} does not have a shield active!`);
           }
       });
	},
};