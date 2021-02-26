const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
    name: 'coins',
    description: 'Returns the amount of coins a user has',
    aliases: ["bal"],
    guildOnly: true,
    cooldown: 1,
    usage: '',
    execute(message, args, con) {        
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        
        let target = message.mentions.users.first() || message.author;
        
        con.query(`SELECT * FROM Noodle WHERE id = '${target.id}'`, (err, rows) => {
            if (err) throw err;
            
            if(!rows[0]) return message.channel.send("This user has never had any coins :( Type " + prefix + "search for coins");
            
            let coins = rows[0].cur; 
            let comCoins = commas(coins)
            
            message.channel.send("<@" + target + "> has " + comCoins + " coins! :tada:");
        });
    },
};