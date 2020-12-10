const mysql = require("mysql");
const w = require("../../items.js");

module.exports = {
	name: 'shop',
    description: 'Show your shop!',
    aliases: [""],
    guildOnly: true,
    cooldown: 1,
	  execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

       con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id}`, (err, rows) => {

           if (err) throw err;

           if(!rows[0]) return message.channel.send("This user does not have enough information on record.");

           let r = rows[0];

           let boxesRem = 5 - rows[0].boxesBought; 
           let userCoins = rows[0].cur;


           const invEmbed = {
            color: 0x92C6DD,
            author: {
                name: `${message.author.username}`,
                icon_url: message.author.displayAvatarURL({ format: "png", dynamic: true })
            },
            fields: [
                {
                    name: `--Your Shop--`,
                    value: `Available boxes to buy: ${boxesRem}\nYour coins: ${commas(userCoins)}`,
                    inline: false,
                },
                {
                    name: "--Items Tier 1--",
                    value: `${w.allItemsNames[0]}\n${w.allItemsNames[1]}\n${w.allItemsNames[2]}\n${w.allItemsNames[3]}\n${w.allItemsNames[4]}\n${w.allItemsNames[5]}\n`,
                    inline: true,
                },
                {
                    name: "--Items Tier 2--",
                    value: `${w.allItemsNames[6]}\n${w.allItemsNames[7]}\n${w.allItemsNames[8]}\n${w.allItemsNames[9]}\n${w.allItemsNames[10]}\n${w.allItemsNames[11]}\n`,
                    inline: true,
                },
            ],
            };

            message.channel.send({ embed: invEmbed });
       });
	},
};