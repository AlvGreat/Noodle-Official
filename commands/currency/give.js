const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'give',
    description: `Give someone some coins! ${prefix}give @someone [amount]`,
    aliases: [],
    guildOnly: true,
    usage: '[req: user] [req: amount]',
    cooldown: 2.5,
	execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        function removeCommas(str) {
            return(str.replace(/,/g,''));
        }

        if(!args[0]) return message.channel.send("Something went wrong. Command usage: !give @user (amount)");
        let target = message.mentions.users.first().id;
        
        if(isNaN(target)) return message.channel.send("Something went wrong. Command usage: !give @user (amount)");

        let amt = args[1];
        amt = removeCommas(amt);
        if (isNaN(amt)) return message.channel.send("That's not a number");
        if(amt < 1) return message.channel.send("You have to give them *something* now, don't you?");

        if (args[1] > 10000000000000000) return message.channel.send("You cannot give someone more than 10,000,000,000,000,000 coins!");
    
        con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id} OR id = ${target} ORDER BY id`, (err, rows) => {

            if(err) throw err;

            if(rows.length < 2) { 
                return message.channel.send("Something went wrong :("); 
            } 

            let curGiver;
            let curReceiver;
            if (parseInt(target) > parseInt(message.author.id)) {
                curGiver = rows[0].cur;
                curReceiver = rows[1].cur;
                if (amt > curGiver) return message.channel.send("You do not have enough coins to give!");
            }
            else {
                curGiver = rows[1].cur;
                curReceiver = rows[0].cur
                if (amt > curGiver) return message.channel.send("You do not have enough coins to give!");
            }

            let bigIntMax = 9000000000000000000;
            //console.log(parseInt(curReceiver) + " \n" + parseInt(amt) + "\n" + (parseInt(curReceiver) + parseInt(amt)) + "\n" + bigIntMax);
            if (parseInt(curReceiver) + parseInt(amt) > bigIntMax) {
                return message.channel.send(`You cannot give someone coins when they're at the coin cap! (9,000,000,000,000,000,000)\n*note that users with more than 16 digits of coins may not give/receive coins properly*`);
            }

            con.query(`UPDATE Noodle SET cur = ${parseInt(curGiver) - parseInt(amt)} WHERE id = ${message.author.id}`);
            con.query(`UPDATE Noodle SET cur = ${parseInt(curReceiver) + parseInt(amt)} WHERE id = ${target}`);

            message.channel.send(`<@${message.author.id}> gave <@${target}> ${commas(amt)} coins!`);
            //con.query(sql, console.log);
        });
	},
};
