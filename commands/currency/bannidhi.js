const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'bannidhi',
    description: 'If you\'re the richest player, get a chance to ban nidhi! Cost: 99% of coins!',
    aliases: [],
    guildOnly: true,
    usage: 'CONFIRM',
    cooldown: 1.5,
	execute(message, args, con) {
        return message.channel.send("This command is currently disabled");
        
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        // if(message.author.id == "304393518816952321" || message.author.id == "619723116435734530") {
        //     try { 
        //         message.guild.member("500733754264911880").kick("Nidhi has been removed from the server!");
        //     }
        //     catch(e) {
        //         return message.channel.send("Something went wrong");
        //     }
        //     return message.channel.send("Payback time?"); 
        // } 

        con.query(`SELECT * FROM Noodle WHERE id = '500733754264911880' UNION SELECT * FROM Noodle WHERE id = '${message.author.id}' UNION SELECT * FROM Noodle ORDER BY cur DESC`, (err, rows) => {
            if(err) throw err;
            
            let topPlayer = rows[2].id;
            let minCur = 1000000000000000000;
            if (rows[0].cur > minCur) {
                minCur = rows[0].cur;
            }
            let cur = rows[1].cur;

            let enoughCoins = false;
            if (cur >= minCur) enoughCoins = true;

            if (message.author.id != topPlayer && !enoughCoins) return message.channel.send(`Sorry, but you have to be the top player to ban nidhi! Check with ${prefix}lb`)
            if(args[0] != "CONFIRM") return message.channel.send(`If you want to ban nidhi, please type in \`${prefix}bannidhi CONFIRM\``);
            
            try { 
                message.guild.member("500733754264911880").kick("Nidhi has been removed from the server!");
            }
            catch(e) {
                return message.channel.send("Something went wrong");
            }

            message.reply(`You just kicked nidhi! Coins used: ${commas(Math.floor(cur * 0.99))}. Coins left: ${commas(cur - Math.floor(cur * 0.99))}`);
            sql = `UPDATE Noodle SET cur = ${Math.floor(cur * 0.1)} WHERE id = '${message.author.id}'`;
            con.query(sql);
        });
	},
};