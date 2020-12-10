const mysql = require("mysql");
const w = require("../../items.js");

module.exports = {
	name: 'inventory',
    description: 'Show your health and weapons',
    aliases: ["inv"],
    guildOnly: true,
    usage: '',
    cooldown: 1,
	  execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        let target; 
        let id = false;

        if (!args[0]) {
            target = message.author;
        }
        else if (args[0].length == 18) { 
            target = {id: args[0]} 
            id = true;
        }
        else if (message.mentions.users.first()) { 
            target = message.mentions.users.first();
        }
        else {
            return message.channel.send(`Invalid argument provided. Usage: ${prefix}inv [optional: ping someone or provide someone's ID]`);
        }

       con.query(`SELECT * FROM Noodle WHERE id = ${target.id}`, (err, rows) => {

           if (err) throw err;

           if(!rows[0]) return message.channel.send("This user does not have enough information on record.");

           let r = rows[0];

           //inventory
           let health = r.health;
           let kills = r.kills;

           //weapons
           let stick = r.stick;
           let knife = r.knife;
           let sword = r.sword;
           let lightsaber = r.lightsaber;
           let basketball = r.basketball;
           let pistol = r.pistol;
           let blaster = r.blaster;
           let sniper = r.sniper;

           //heals
           let mini = r.miniPotion;
           let hp = r.healthPotion;
           let max = r.maxPotion;
           let overdose = r.overdosePotion;

            //id mode
            let avatar;
            if (!id) {
                avatar = target.displayAvatarURL({ format: "png", dynamic: true });
            }

            let name = `User ID: ${target.id}`;

            if(!id) { 
                name = target.username;
            }
            
           const invEmbed = {
            color: 0x92C6DD,
            author: {
                name: `${target.username}`,
                icon_url: target.displayAvatarURL({ format: "png", dynamic: true })
            },
            fields: [
                {
                    name: "--Stats--",
                    value: `:heart: Health: ${health}\n:skull_crossbones: Kills: ${kills}`,
                    inline: false,
                },
                {
                    name: "--Weapons Tier 1--",
                    value: `Sticks: ${stick}\nKnives: ${knife}\nSwords: ${sword}\nLightsabers: ${lightsaber}`,
                    inline: true,
                },
                {
                    name: "--Weapons Tier 2--",
                    value: `Basketballs: ${basketball}\nPistols: ${pistol}\nBlasters: ${blaster}\nSnipers: ${sniper}`,
                    inline: true,
                },
                {
                    name: "--Health Items--",
                    value: `Mini Potions: ${mini}\nHealth Potions: ${hp}\nMax Potions: ${max}\nOverdose Potions: ${overdose}`,
                    inline: true,
                },
            ],
            };

            message.channel.send({ embed: invEmbed });
       });
	},
};