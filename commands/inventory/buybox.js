const mysql = require("mysql");
const { prefix } = require('../../config.json');
const w = require("../../items.js");

module.exports = {
	name: 'buybox',
    description: `Get a random item for your inventory! Buy a box of tier1 (only Tier 1 items- 6% of coins), tier2 (Tier 1 and 2 items- 8% of coins), or tier3 (only Tier 2 items- 10% of coins) or heal (only health items- 8% of coins).`,
    aliases: ["bbox"],
    guildOnly: true,
    cooldown: 1,
	execute(message, args, con) {   
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        const error = `Improper use of command. Please provide a valid argument: ${prefix}bbox [type (tier1, tier2, tier3, heal)]. Ex: ${prefix}bbox tier3`
        if(!args[0]) return message.channel.send(error);
        let boxType = args[0];
        if(boxType != "tier1" && boxType != "tier2" && boxType != "tier3" && boxType != "1" && boxType != "2" && boxType != "3") return message.channel.send(error);

        if(boxType == "1" || boxType == "2" || boxType == "3") {
            boxType = `tier${boxType}`;
        }

        con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {
            if(err) throw err;

            if(rows.length < 1) { 
                return message.channel.send("Something went wrong :("); 
            } 

            let boxesRem = 5 - rows[0].boxesBought; 
            if (boxesRem < 1) return message.channel.send(`You cannot buy any more boxes right now! Check out the ${prefix}resetshop command so that you can buy 5 more boxes!`);
            let userCoins = rows[0].cur;

            if (userCoins < 1000000000) return message.channel.send(`You need at least 1,000,000,000 coins to buy a box!`);
            if (BigInt(userCoins) > 500000000000000000n) {
                userCoins = 1000000000000000000;
            }

            let weapon, rand;
            if(boxType === "tier1") {
                rand = Math.floor(Math.random() * w.tier1.length);
                weapon = w.tier1[rand].name;     
                //6% of coins
                userCoins *= 0.06;
                con.query(`UPDATE Noodle SET cur = cur * 0.94 WHERE id = '${message.author.id}'`);
                con.query(`UPDATE Noodle SET boxesBought = boxesBought + 1 WHERE id = '${message.author.id}'`);
            }
            else if (boxType === "tier2") {
                rand = Math.floor(Math.random() * w.allItems.length);
                weapon = w.allItems[rand].name;  
                //8% of coins
                userCoins *= 0.08;
                con.query(`UPDATE Noodle SET cur = cur * 0.92 WHERE id = '${message.author.id}'`);
                con.query(`UPDATE Noodle SET boxesBought = boxesBought + 1 WHERE id = '${message.author.id}'`);
            }
            else if (boxType === "tier3") { 
                rand = Math.floor(Math.random() * w.tier2.length);
                weapon = w.tier2[rand].name;  
                //10% of coins
                userCoins *= 0.1;
                con.query(`UPDATE Noodle SET cur = cur * 0.9 WHERE id = '${message.author.id}'`);
                con.query(`UPDATE Noodle SET boxesBought = boxesBought + 1 WHERE id = '${message.author.id}'`);
            }
            else if (boxType === "heal") {
                rand = Math.floor(Math.random() * w.heals.length);
                weapon = w.heals[rand].name;  
                //8% of coins
                userCoins *= 0.08;
                con.query(`UPDATE Noodle SET cur = cur * 0.92 WHERE id = '${message.author.id}'`);
                con.query(`UPDATE Noodle SET boxesBought = boxesBought + 1 WHERE id = '${message.author.id}'`);
            }

            //give weapon and send out message
            con.query(`UPDATE Noodle SET ${weapon} = ${weapon} + 1 WHERE id = '${message.author.id}'`);
            message.reply(`You got a ${weapon} out of your ${boxType} box!\n You spent: ${commas(userCoins)} coins.\n Boxes in the shop remaining: ${boxesRem - 1}`);
        })
	},
};