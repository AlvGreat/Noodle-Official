const mysql = require("mysql");
const { prefix } = require("../../config.json");
const Discord = require('discord.js'); //require discord.js

module.exports = {
	name: 'rob',
    description: 'Rob someone of their precious coins!',
    aliases: ["steal"],
    guildOnly: true,
    cooldown: 3600,
    customCooldown: true,
	execute(message, args, con, cooldowns) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
           
        function setCooldown() {
            if (!cooldowns.has(this.name)) {
                cooldowns.set(this.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(this.name);
            const cooldownAmount = (this.cooldown) * 1000;
            
            function timeFormat(duration) {   
                // Hours, minutes and seconds
                let hrs = Math.floor(duration / 3600);
                let mins = Math.floor((duration % 3600) / 60);
                let secs = Math.floor(duration % 60);
                let ms = (duration - Math.floor(duration)).toFixed(3);
                
                // Output like "1:01" or "4:03:59" or "123:03:59"
                let ret = "";
        
                if (hrs > 0) { //if there are hours, include it
                    ret += hrs + ":" + (mins < 10 ? "0" : "");
                }
                else if(mins <= 9) { //if there's only 9 minutes or less, include ms 
                    secs = parseFloat(secs) + parseFloat(ms);
                }
                
                ret += mins + ":" + (secs < 10 ? "0" : "");
                ret += secs;
                return ret;
            }
        
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`please wait ${timeFormat(timeLeft)} before reusing the \`${this.name}\` command.`);
                }
            }
        
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

        if (!args[0]) return message.channel.send(`You have used the command incorrectly. Please mention the user you wish to rob. Usage: ${prefix}rob @user`);

        let target;
        if (!message.mentions.users.first()) target = message.author.id;
        else target = message.mentions.users.first().id;
        
        let robber = message.author.id;

        if (target == robber) {
            return message.channel.send(`You have used the command incorrectly. Please mention the user you wish to rob. Usage: ${prefix}rob @user`)
        }

        if(isNaN(target)) return message.channel.send(`You have used the command incorrectly. Please mention the user you wish to rob. Usage: ${prefix}rob @user`);
        // can't rob the bot itself
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

            if(thiefMoney * 100 < victimMoney) {
                return message.channel.send("You cannot rob someone with more than 100x more coins than you!");
            }
        
            // if they've made it this far, then they've successfully robbed, so set cooldown
            setCooldown();

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
           
            const bigIntMax = 9000000000000000000;

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
                    if(victim.cur + amt < bigIntMax) {
                        con.query(`UPDATE Noodle SET cur = ${victim.cur + amt} WHERE id = ${target}`);
                    }
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
                    if(victim.cur + amt < bigIntMax) {
                        con.query(`UPDATE Noodle SET cur = ${victim.cur + amt} WHERE id = ${target}`);
                    }
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
                    if(victim.cur + amt < bigIntMax) {
                        con.query(`UPDATE Noodle SET cur = ${victim.cur + amt} WHERE id = ${target}`);
                    }
                    message.channel.send(`<@${message.author.id}> lost ${commas(amt)} coins to <@${target}> in reverse! (${percent * 100}%!)`);
                    con.query(`UPDATE Noodle SET shield = 0 WHERE id = ${target} OR id = ${robber}`);
                }
            }
        });
    },
};

