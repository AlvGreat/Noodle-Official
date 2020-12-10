const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'mbuy',
    description: `Buy a random multiplier! It will cost you 50% of your coins, given that you're a top 3 player! Max multiplier: 150%`,
    aliases: [],
    guildOnly: true,
    usage: '',
    cooldown: 2,
	execute(message, args, con) {
        function mAmt1() {
            let min = 1; 
            let max = 1.3; 
        
            return (Math.random() * (max - min)) + min;
        }

        function mAmt2() {
            let min = 1.2; 
            let max = 1.5; 
        
            return (Math.random() * (max - min)) + min;
        }

        function mAmt3() {
            let min = 1.4; 
            let max = 1.5; 
        
            return (Math.random() * (max - min)) + min;
        }


        con.query(`SELECT * FROM Noodle ORDER BY cur DESC`, (err, rows) => {

            if(err) throw err;

            if (message.author.id != rows[0].id && message.author.id != rows[1].id && message.author.id != rows[2].id) {
                return message.channel.send("You are not a top 3 player!");
            }
            else {

                con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {

                    if(err) throw err;
                    
                    mult = rows[0].multiplier;
                    let amt;

                    if (rows[0].multiplier > 1.4) {
                        amt = mAmt3();
                    }
                    else if (rows[0].multiplier > 1.2) {
                        amt = mAmt2();
                    }
                    else {
                        amt = mAmt1();
                    }

                    //take the coins
                    con.query(`UPDATE Noodle SET cur = (cur * 0.5) WHERE id = ${message.author.id}`);
                    

                    message.reply(`Your new multiplier is ${amt}!`);
                    if (amt > 1.45) {
                        if (rows[0].badge4 == 0) {
                            con.query(`UPDATE Noodle SET badge4 = 1 WHERE id = ${message.author.id}`);
                            message.channel.send(`<@${message.author.id}>, you have unlocked a new badge! Use ${prefix}profile to see it!`);
                        }
                    }
                    //update the multiplier
                    sql = `UPDATE Noodle SET multiplier = ${amt} WHERE id = '${message.author.id}'`;
                    con.query(sql);
                    //con.query(sql, console.log);
                });
            }
        })
	},
};
