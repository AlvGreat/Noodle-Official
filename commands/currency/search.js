const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'search',
    description: 'Search for a random amount of coins from 1-200! 0.01% chance to find 20% of the coins you currently have!',
    aliases: [],
    guildOnly: true,
    cooldown: 1.5,
	execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        function searchAmt() {
            let min = 1; 
            let max = 200; 
        
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


       con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {

        if(err) throw err;
        if(!rows[0]) return message.channel.send(`You have not used the currency system yet! Use ${prefix}hourly or ${prefix}daily to start!`);

        let sql; 
        let cur = rows[0].cur;
        let amt, msg; 
        if (Math.random() < 0.98) {
            amt = searchAmt();
            msg = amt;
        }
        else {
            amt = cur * 0.2;
            msg = `the jackpot!- ${commas(amt)}`;
            if (rows[0].badge5 == 0) {
                con.query(`UPDATE Noodle SET badge5 = 1 WHERE id = ${message.author.id}`);
                message.channel.send(`You have unlocked a new badge! Use ${prefix}profile to see it!`);
            }
        }

        let bigIntMax = 9000000000000000000;
        if (cur + amt > bigIntMax) {
            message.reply("You found " + commas(amt) + " coins! :tada:");
            con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);

            con.query(`UPDATE Noodle SET badge1 = badge1 + 1 WHERE id = ${message.author.id}`);
            return message.channel.send(`Congrats, you have beaten the bot's currency system! Check ${prefix}profile to see your new badge! Your currency has been reset.`);

        }

        sql = `UPDATE Noodle SET cur = ${cur + amt} WHERE id = '${message.author.id}'`;

        message.reply("You found " + msg + " coins! :tada:");
        con.query(sql);
        //con.query(sql, console.log);
    });
	},
};
