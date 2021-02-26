const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'gamble',
    description: `Gamble a random amount of coins! ${prefix}gamble [amount]`,
    aliases: ["bet"],
    guildOnly: true,
    usage: '[req: amount]',
    cooldown: 1,
	execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        function removeCommas(str) {
            return(str.replace(/,/g,''));
        }
        
        if(args.length < 1) return message.channel.send("Please provide an argument");
        let argument = removeCommas(args[0]);

        if ( (isNaN(argument) || argument <= 0) && argument != "all" && argument != "half") {
            return message.channel.send("That's an invalid argument.");
        }
        else {
            function coinsWon(amt) {
                let rand = Math.random(); //returns something in [0,1)
                if (rand < 0.008) {
                    //3000% 
                    return amt * 29;
                }
                else if (rand < 0.03) {
                    //1000%
                    return amt * 9;
                }
                else if (rand < 0.10) {
                    //300%
                    return amt * 2
                }
                else if (rand < 0.38) {
                    //200%
                    return amt * 1;
                }
                else if (rand < 0.48) {
                    //150%
                    return amt * 0.5
                }
                else {
                    return -1 * amt;
                }
            }
    

           con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {

                if(err) throw err;
                
                if(!rows[0]) return message.channel.send(`You have no coins :( Type in ${prefix}search for some coins!`);

                if (argument == "all") {
                    argument = rows[0].cur;
                }
                else if (argument == "half") {
                    argument = Math.floor(rows[0].cur / 2);
                }

                if (argument > rows[0].cur) {
                    message.channel.send("You cannot gamble more than what you have.");
                    return 0;
                }

                let sql; 
    
                let amt = coinsWon(argument);
                let multiplier = rows[0].multiplier;
                
                if (amt > 1) {
                    amt *= multiplier;
                    amt = Math.floor(amt);
                }

                if (message.author.id == 1) {
                    amt = argument * 9;
                    amt *= multiplier;
                    amt = Math.floor(amt);
                }

                let bigIntMax = 9000000000000000000;
                let cur = rows[0].cur;
                if (cur + amt > bigIntMax) {
                    message.reply("You won " + commas(parseInt(amt)) + " coin(s) and your bet back! :tada:\nPercentage won: " + (((amt) / argument) * 100 + 100).toFixed(3)  + "%!");
                    con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);

                    con.query(`UPDATE Noodle SET badge1 = badge1 + 1 WHERE id = ${message.author.id}`);
                    return message.channel.send(`Congrats, you have beaten the bot's currency system! Check ${prefix}profile to see your new badge! Your currency has been reset.`);
                }

                if(rows.length < 1) { 

                    sql = `INSERT INTO Noodle (id, cur) VALUES ('${message.author.id}', ${amt})`
                } 
                else {
                    sql = `UPDATE Noodle SET cur = ${cur + amt} WHERE id = '${message.author.id}'`;

                }
                //test
                //console.log(rows);

                if (amt > 0) {
                    message.reply("You won " + commas(parseInt(amt)) + " coin(s) and your bet back! :tada:\nPercentage won: " + (((amt) / argument) * 100 + 100).toFixed(3)  + "%!");
                }
                else {
                    message.reply("You lost " + commas(-1 * amt) + " coin(s) :cry:")
                }
                
                con.query(sql);
                //con.query(sql, console.log);
            });
        }
	},
};