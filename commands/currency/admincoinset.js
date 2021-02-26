const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'admincoinset',
    description: 'For admin usage only.',
    aliases: ["acset"],
    guildOnly: true,
    usage: '[req: user] [req: amount]',
    cooldown: 0,
	execute(message, args, con) {
        let Alv = "304393518816952321";
        let Luis = "252536683944214531";

        if(message.author.id != Alv /* && message.author.id != Luis */ ) return;

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
        if (isNaN(amt)) return;

        con.query(`SELECT * FROM Noodle WHERE id = ${target} ORDER BY id`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("Something went wrong :("); 
            } 
            
            curReceiver = rows[0].cur;

            let bigIntMax = 9000000000000000000;
            if (parseInt(amt) > bigIntMax) {
                con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${target}`);
                con.query(`UPDATE Noodle SET badge1 = badge1 + 1 WHERE id = ${target}`);
                return message.channel.send(`<@${target}>, congrats! You have beaten the bot's currency system! Check ${prefix}profile to see your new badge! Your currency has been reset.`);
            }

            con.query(`UPDATE Noodle SET cur = ${parseInt(amt)} WHERE id = ${target}`);

            message.channel.send(`<@${message.author.id}> set <@${target}>'s coins to ${commas(amt)} coins using admin permissions!`);
        });
	},
};
