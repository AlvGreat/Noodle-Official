const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'setmp',
    description: 'For admin usage only.',
    aliases: ["setmultiplier"],
    guildOnly: true,
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

        if(!args[0]) return message.channel.send(`Something went wrong. Command usage: ${prefix}setmp @user (amount)`);
        let target = message.mentions.users.first().id;
        
        if(isNaN(target)) return message.channel.send(`Something went wrong. Command usage: ${prefix}setmp @user (amount)`);

        let amt = args[1];
        amt = removeCommas(amt);
        if (isNaN(amt)) return;

        con.query(`SELECT * FROM Noodle WHERE id = ${target} ORDER BY id`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("Something went wrong :("); 
            } 
            
            curReceiver = rows[0].cur;

            con.query(`UPDATE Noodle SET multiplier = ${amt} WHERE id = ${target}`);


            message.channel.send(`<@${message.author.id}> set <@${target}>'s multiplier to ${amt} using admin permissions!`);
            //con.query(sql, console.log);
        });
	},
};
