const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'banak',
    description: 'If you\'re the richest player, get a chance to ban ak at the cost of 99.9% of your coins!',
    aliases: [],
    guildOnly: true,
    usage: 'CONFIRM',
    cooldown: 1.5,
	execute(message, args, con) {
        return message.channel.send("This command is currently disabled");

        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        
        con.query(`SELECT * FROM Noodle ORDER BY cur DESC`, (err, rows) => {

            if(err) throw err;
            
            let topPlayer = rows[0].id;

            if (message.author.id != topPlayer) return message.channel.send(`Sorry, but you have to be the top player to ban ak! Check with ${prefix}lb`)
            if(args[0] != "CONFIRM") return message.channel.send(`If you want to ban ak, please type in \`${prefix}banak CONFIRM\``);

            if (rows[0].badge3 == 0) {
                con.query(`UPDATE Noodle SET badge3 = 1 WHERE id = ${message.author.id}`);
                message.channel.send(`You have unlocked a new badge! Use ${prefix}profile to see it!`);
            }

            sql = `UPDATE Noodle SET cur = ${Math.floor(cur * 0.001)} WHERE id = '${message.author.id}'`;

            try { 
                message.guild.member("619723116435734530").kick("Akalpit has been removed from the server!");
            }
            catch(e) {
                return message.channel.send("Something went wrong");
            }

            
            message.reply(`You just kicked ak! Coins used: ${commas(Math.floor(cur * 0.999))}. Coins left: ${commas(cur - Math.floor(cur * 0.99))}`);
            
            con.query(sql);
            //con.query(sql, console.log);
        });
	},
};