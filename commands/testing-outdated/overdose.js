//no longer needed after heal was updated

const mysql = require("mysql");
const { prefix } = require('../../config.json');
const w = require("../../items.js");

module.exports = {
	name: 'overdose',
    description: `Heal with more than one overdose potion using ${prefix}overdose [amount]`,
    aliases: [],
    guildOnly: true,
    cooldown: 2,
	execute(message, args, con) {
        //heals
        class Heal {
            constructor(name, minAtk, maxAtk) {
                this.name = name;
                this.minAtk = minAtk;
                this.maxAtk = maxAtk;
            }
        }
        const heal = new Heal("overdosePotion", 15, 25);

        //input validation
        if(!args[0]) return message.channel.send(`Something went wrong. Command usage: ${prefix}overdose [amount]`);
        if(args[0] < 1) return message.channel.send(`Something went wrong. Command usage: ${prefix}overdose [amount]`);
        
        let amt = args[0]

        con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id}`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("You do not have any data on file :("); 
            } 

            let healAmt = rows[0].overdosePotion;
            let targetHealth = rows[0].health;
            
            if(healAmt < amt) return message.channel.send(`You do not have enough of your selected item (${heal.name})`);

            function randomNum(num1, num2) { 
                return Math.round((Math.random() * (num2 - num1) + num1));
            }

            let healHP = 0;
            for (i=0; i < amt; i++) {
                healHP += randomNum(heal.minAtk, heal.maxAtk);
            }

            message.channel.send(`<@${message.author.id}> healed themselves with ${amt} overdose potions for ${healHP} health. They now have ${targetHealth + healHP} health left!`);
            con.query(`UPDATE Noodle SET health = health + ${healHP} WHERE id = ${message.author.id}`);
            con.query(`UPDATE Noodle SET ${heal.name} = ${heal.name} - ${amt} WHERE id = ${message.author.id}`)
        })
	},
};
