const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'hourly',
    description: 'Claim your hourly coins',
    aliases: [],
    guildOnly: true,
    usage: '',
    cooldown: 3600,
	execute(message, args, con) {
        con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {
            if(err) throw err;
            
            let sql; 
            let amt = 1000;

            message.reply("You have claimed your hourly 1000 coins! :tada:")

            if(rows.length < 1) { 
                sql = `INSERT INTO Noodle (id, cur) VALUES ('${message.author.id}', ${amt})`
            } 
            else {
                let bigIntMax = 9000000000000000000;
                let cur = rows[0].cur;

                if (cur + amt > bigIntMax) {
                    con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);
                    con.query(`UPDATE Noodle SET badge1 = badge1 + 1 WHERE id = ${message.author.id}`);
                    return message.channel.send(`Congrats, you have beaten the bot's currency system! Check ${prefix}profile to see your new badge! Your currency has been reset.`);
                }
                sql = `UPDATE Noodle SET cur = ${cur + amt} WHERE id = '${message.author.id}'`;
            }

            con.query(sql);
        });
	},
};
