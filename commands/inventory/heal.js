const mysql = require("mysql");
const { prefix } = require('../../config.json');
const w = require("../../items.js");

module.exports = {
	name: 'heal',
    description: `Use something from your inventory! ${prefix}heal [item] [amount]. Shortcuts for items: remove the potion at the end of the name`,
    aliases: ["use"],
    guildOnly: true,
    cooldown: 2,
	execute(message, args, con) {
        function randomNum(num1, num2) { 
            return Math.round((Math.random() * (num2 - num1) + num1));
        }

        //input validation
        if(!args[0]) return message.channel.send(`Something went wrong. Command usage: ${prefix}heal [item] [amount]`);
        let heal = args[0];
        if (w.allHealNames.indexOf(heal) < 0) return message.channel.send(`Something went wrong. Command usage: ${prefix}heal [item] [amount]`);
        
        let timesToHeal;
        if(!args[1]) {
            timesToHeal = 1;
        }
        else if(!isNaN(args[1])) { 
            timesToHeal = args[1];
        }
        else { 
            return message.channel.send("Please provide a number for the amount of potions you wish to use");
        }

        //if using overdose
        let usingOver = false;
        if (args[0] == "overdosePotion" || args[0] == "overdose") {
            usingOver = true;
        }

        con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id}`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("You do not have any data on file :("); 
            } 

            //see what heal the user has
            switch(heal) {
                case "miniPotion": heal = w.heals[0]; break;
                case "healthPotion": heal = w.heals[1]; break;
                case "maxPotion": heal = w.heals[2]; break;
                case "overdosePotion": heal = w.heals[3]; break;
                //shortcuts
                case "mini": heal = w.heals[0]; break;
                case "health": heal = w.heals[1]; break;
                case "max": heal = w.heals[2]; break;
                case "overdose": heal = w.heals[3]; break;
            }
            //check if user has item
            let itemAmt = rows[0][heal.name];
            if(itemAmt < 1) return message.channel.send(`You do not have any of your selected item (${heal.name})`);

            //check user health
            let targetHealth = rows[0].health;
            if (targetHealth >= 100 && !usingOver) return message.channel.send("You already have > 100 health, so you cannot heal further with your selected item!");

            let healedHP = 0;

            for (let i=0; i < timesToHeal; i++) {
                healedHP += randomNum(heal.minAtk, heal.maxAtk);
                if (targetHealth + healedHP >= 100 && !usingOver) {
                    healedHP = 100 - targetHealth;
                }
            }

            message.channel.send(`<@${message.author.id}> healed themselves for ${healedHP} health. They now have ${targetHealth + healedHP} health left!`);
            con.query(`UPDATE Noodle SET health = health + ${healedHP} WHERE id = ${message.author.id}`);
            con.query(`UPDATE Noodle SET ${heal.name} = ${heal.name} - 1 WHERE id = ${message.author.id}`)
        })
	},
};
