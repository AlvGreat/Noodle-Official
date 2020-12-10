const mysql = require("mysql");
const { prefix } = require("../../config.json");

module.exports = {
	name: 'rob',
    description: 'Rob someone of their precious coins!',
    aliases: ["steal"],
    guildOnly: true,
    cooldown: 3600,
	execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        if (!args[0]) return message.channel.send(`You have used the command incorrectly. Please mention the user you wish to rob. Usage: ${prefix}rob @user`);

        let target = message.mentions.users.first().id || message.author.id;
        let robber = message.author.id;

        if (target == robber) {
            return message.channel.send(`You have used the command incorrectly. Please mention the user you wish to rob. Usage: ${prefix}rob @user`)
        }

        if(isNaN(target)) return message.channel.send(`You have used the command incorrectly. Please mention the user you wish to rob. Usage: ${prefix}rob @user`);
        if(target == 697984301567836323) return message.channel.send("You cannot rob me!");
        
        con.query(`SELECT * FROM Noodle WHERE id = ${robber} UNION SELECT * FROM Noodle WHERE id = ${target}`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 2) { 
                return message.channel.send("Something went wrong :("); 
            } 

            const thief = rows[0];
            const victim = rows[1];

            if (thief.cur < 1000000) {
                return message.channel.send("You need at least 1 million coins to rob someone!");
            }
            let thiefMoney = thief.cur;
            let victimMoney = victim.cur;

            if(thiefMoney * 50 < victimMoney) {
                return message.channel.send("You cannot rob someone with more than 50x more coins than you!");
            }
        
            let amt, percent;
            /*
            if shield on:
            chances of robbing: 40%
            percent robbed: 10%
            percent lost: 30%

            if upgraded shield on: 
            chances of robbing: 30%
            percent robbed: 2%
            percent lost: 30%

            else: 
            chances of robbing: 60%
            percent robbed: 40%
            percent lost: 30%
            */
            function checkMax(user, userRow, amt) {
                let bigIntMax = 9000000000000000000;
                let userCur = userRow.cur;
                if (userCur + amt > bigIntMax) {
                    con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);
     
                    con.query(`UPDATE Noodle SET badge1 = 1 WHERE id = ${message.author.id}`);
                    return message.channel.send(`<@${user}>, congrats, you have beaten the bot's currency system! Check ${prefix}profile to see your new badge! Your currency has been reset.`);
                }
            }
           
            function checkMaxTarget(user, userRow, amt) {
                let bigIntMax = 9000000000000000000;
                let userCur = userRow.cur;
                if (userCur + amt > bigIntMax) {
                    con.query(`UPDATE Noodle SET cur = 9000000000000000000 WHERE id = ${message.author.id}`);
                }
            }
           
            if (victim.shield == 1) {
                //successful 
                if (Math.random() < 0.4) {    
                    percent = 0.1;
                    amt = Math.floor(victim.cur * percent);

                    checkMax(robber, thief, amt);

                    con.query(`UPDATE Noodle SET cur = ${victim.cur - amt} WHERE id = ${target}`);
                    con.query(`UPDATE Noodle SET cur = ${thief.cur + amt} WHERE id = ${robber}`);
                    message.channel.send(`<@${robber}> stole ${commas(amt)} coins from <@${target}>! (${percent * 100}%!)`);
                    //disable shield
                    con.query(`UPDATE Noodle SET shield = 0 WHERE id = ${target} OR id = ${robber}`);
                }
                //not successful
                else {
                    percent = 0.3;
                    amt = thief.cur * percent;

                    checkMaxTarget(target, victim, amt);

                    con.query(`UPDATE Noodle SET cur = ${thief.cur - amt} WHERE id = ${robber}`);
                    message.channel.send(`<@${message.author.id}> lost ${commas(amt)} coins to <@${target}> in reverse! (${percent * 100}%!)`);
                    //disable shield
                    con.query(`UPDATE Noodle SET shield = 0 WHERE id = ${target} OR id = ${robber}`);
                }
            }
            else if (victim.shield == 2) {
                //successful 
                if (Math.random() < 0.3) {
                    percent = 0.02;
                    amt = Math.floor(victim.cur * percent);

                    checkMax(robber, thief, amt);

                    con.query(`UPDATE Noodle SET cur = ${victim.cur - amt} WHERE id = ${target}`);
                    con.query(`UPDATE Noodle SET cur = ${thief.cur + amt} WHERE id = ${robber}`);
                    message.channel.send(`<@${robber}> stole ${commas(amt)} coins from <@${target}>! (${percent * 100}%!)`);
                    //disable shield
                    con.query(`UPDATE Noodle SET shield = 0 WHERE id = ${target} OR id = ${robber}`);
                }
                //not successful
                else {
                    percent = 0.3;
                    amt = thief.cur * percent;

                    checkMaxTarget(target, victim, amt);

                    con.query(`UPDATE Noodle SET cur = ${thief.cur - amt} WHERE id = ${robber}`);
                    message.channel.send(`<@${message.author.id}> lost ${commas(amt)} coins to <@${target}> in reverse! (${percent * 100}%!)`);
                    //disable shield
                    con.query(`UPDATE Noodle SET shield = 0 WHERE id = ${target} OR id = ${robber}`);
                }
            }
            else {
                //successful 
                if (Math.random() < 0.6) {
                    percent = 0.4;
                    amt = victim.cur * percent;

                    checkMax(robber, thief, amt);

                    con.query(`UPDATE Noodle SET cur = ${victim.cur - amt} WHERE id = ${target}`);
                    con.query(`UPDATE Noodle SET cur = ${thief.cur + amt} WHERE id = ${robber}`);
                    message.channel.send(`<@${robber}> stole ${commas(amt)} coins from <@${target}>! (${percent * 100}%!)`);
                    con.query(`UPDATE Noodle SET shield = 0 WHERE id = ${target} OR id = ${robber}`);
                }
                //not successful
                else {
                    percent = 0.3;
                    amt = thief.cur * percent;

                    checkMaxTarget(target, victim, amt);

                    con.query(`UPDATE Noodle SET cur = ${thief.cur - amt} WHERE id = ${robber}`);
                    message.channel.send(`<@${message.author.id}> lost ${commas(amt)} coins to <@${target}> in reverse! (${percent * 100}%!)`);
                    con.query(`UPDATE Noodle SET shield = 0 WHERE id = ${target} OR id = ${robber}`);
                }
            }
            
            //con.query(sql, console.log);
        });
	},
};
