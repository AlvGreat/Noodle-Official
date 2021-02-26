const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
	name: 'slots',
    description: `Play the slot machine! ${prefix}slots [amount]`,
    aliases: ["sl"],
    guildOnly: true,
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

        if ((isNaN(argument) || argument <= 0) && argument != "all" && argument != "half") {
            return message.channel.send("That's an invalid argument.");
        }

        con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {
            if(err) throw err;
            
            if(!rows[0]) return message.channel.send(`You have no coins :( Type in ${prefix}daily for some coins!`);

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
            
            //const symbols = [1, 2, 3, 4, 5, 6, 7];
            const symbols = [':cherries:', ':lemon:', ':watermelon:', ':dollar:', ':moneybag:', ':gem:'];
            
            let slot1 = symbols[Math.floor(Math.random() * symbols.length)]; 
            let slot2 = symbols[Math.floor(Math.random() * symbols.length)]; 
            let slot3 = symbols[Math.floor(Math.random() * symbols.length)]; 
            let slots = [slot1, slot2, slot3];

            //winnings
            let winMult = -1;
            if (slots[0] == ':cherries:') {
                winMult++;
            }
            if (slots[1] == ':cherries:') {
                winMult++;
            }
            if (slots[2] == ':cherries:') {
                winMult++;
            }
            if (slots[0] == slots[1] && slots[1] == slots[2] && slots[2] == ':lemon:') {
                winMult = 2;
            }
            if (slots[0] == slots[1] && slots[1] == slots[2] && slots[2] == ':watermelon:') {
                winMult = 2;
            }
            if (slots[0] == slots[1] && slots[1] == slots[2] && slots[2] == ':dollar:') {
                winMult = 9;
            }
            if (slots[0] == slots[1] && slots[1] == slots[2] && slots[2] == ':moneybag:') {
                winMult = 19;
            }
            if (slots[0] == slots[1] && slots[1] == slots[2] && slots[2] == ":gem:") {
                winMult = 49;
                if (rows[0].badge6 == 0) {
                    message.reply(`You got a new badge! Check it with ${prefix}profile!`)
                }
                con.query(`UPDATE Noodle SET badge6 = badge6 + 1 WHERE id = ${message.author.id}`);
            }

            if (Math.random() < 0.005) {
                for (let i = 0; i < slots.length; i++) {
                    slots[i] = ':gem:';
                }
                winMult = 49;

                if (rows[0].badge6 == 0) {
                    message.reply(`You got a new badge! Check it with ${prefix}profile!`)
                }
                con.query(`UPDATE Noodle SET badge6 = badge6 + 1 WHERE id = ${message.author.id}`);
            }
            else if (Math.random() < 0.012) {
                for (let i = 0; i < slots.length; i++) {
                    slots[i] = ':moneybag:';
                }
                winMult = 19;
            }
            else if (Math.random() < 0.030) {
                for (let i = 0; i < slots.length; i++) {
                    slots[i] = ':dollar:';
                }
                winMult = 9;
            }
            else if (Math.random() < 0.09) {
                for (let i = 0; i < slots.length; i++) {
                    slots[i] = ':watermelon:';
                }
                winMult = 2;
            }
            else if (Math.random() < 0.15) {
                for (let i = 0; i < slots.length; i++) {
                    slots[i] = ':lemon:';
                }
                winMult = 2;
            }
            
            let sql; 
            let amt = argument * winMult;
            let multiplier = rows[0].multiplier;
            
            if (amt > 0) {
                amt *= multiplier;
                amt = Math.floor(amt);
            }
            
            let msg;
            if (amt > 0) {
                msg = ("You won " + commas(parseInt(amt)) + " coin(s) and your bet back! :tada:\nPercentage won: " + (((amt) / argument) * 100 + 100).toFixed(3)  + "%!");
            }
            else if (amt == 0) {
                msg = ("You didn't win anything, but you got your bet back!");
            }
            else {
                msg = ("You lost " + commas(-1 * amt) + " coin(s) :cry:");
            }

            const slotEmbed = {
                color: 0x92C6DD,
                author: {
                    name: `${message.author.username}`,
                    icon_url: message.author.displayAvatarURL({ format: "png", dynamic: true })
                },
                fields: [
                    {
                        name: "--Slot Machine--",
                        value: `| ${slots[0]}    ${slots[1]}    ${slots[2]} |`,
                        inline: false,
                    },
                    {
                        name: "--Results--",
                        value: msg + "\nYour multiplier: " + multiplier,
                        inline: false,
                    }
                ],
                };
            
            message.channel.send({ embed: slotEmbed });
            
            let cur = rows[0].cur;

            let bigIntMax = 9000000000000000000;
            if (cur + amt > bigIntMax) {
                con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);
                con.query(`UPDATE Noodle SET badge1 = badge1 + 1 WHERE id = ${message.author.id}`);
                return message.channel.send(`Congrats, you have beaten the bot's currency system! If this is your first/fifth time, check ${prefix}profile to see your new badge! Your currency has been reset.`);
            }

            sql = `UPDATE Noodle SET cur = ${cur + amt} WHERE id = '${message.author.id}'`;
            con.query(sql);
            //con.query(sql, console.log);
        });
	},
};