const mysql = require("mysql");
const { prefix } = require('../../config.json');
const w = require("../../items.js");
const heal = require("./heal");

module.exports = {
	name: 'attack',
    description: `Attack someone with a weapon! ${prefix}attack @someone [weapon]. Upon death of target, you will receive 5% of their coins and 40% of each of their items (rounded down).`,
    aliases: [],
    guildOnly: true,
    cooldown: 2,
	execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        const weapons = w.allWeaponNames;

        //input validation
        if(!args[0]) return message.channel.send(`Something went wrong. Command usage: ${prefix}attack @user (weapon)`);
        if(!message.mentions.users.first().id) return message.channel.send("You must ping someone to attack!");
        let target = message.mentions.users.first().id;
        let targetNoID = message.mentions.users.first();

        let weapon = args[1];
        if (weapons.indexOf(weapon) < 0) return message.channel.send(`Something went wrong. Command usage: ${prefix}attack @user (weapon)`);
        
        con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id} UNION SELECT * FROM Noodle WHERE id = ${target}`, (err, rows) => {
            //rows[0] = attacker
            //rows[1] = target
            if(err) throw err;

            if(rows.length < 2) { 
                return message.channel.send("Something went wrong :("); 
            } 

            //steal 5% of coins
            let targetCur = Math.floor(0.05 * rows[1].cur);
            
            //see what weapon the user has
            switch(weapon) {
                //tier 1
                case "stick": weapon = w.fullWeapons[0]; break;
                case "knife": weapon = w.fullWeapons[1]; break;
                case "sword": weapon = w.fullWeapons[2]; break;
                case "lightsaber": weapon = w.fullWeapons[3]; break;
                //tier 2
                case "basketball": weapon = w.fullWeapons[4]; break;
                case "pistol": weapon = w.fullWeapons[5]; break;
                case "blaster": weapon = w.fullWeapons[6]; break;
                case "sniper": weapon = w.fullWeapons[7]; break;
            }
            let weaponAmt = rows[0][weapon.name];

            if(weaponAmt < 1) return message.channel.send(`You do not have any of your selected weapon (${weapon.name})`);

            //random damage
            function randomNum(num1, num2) { 
                return Math.round((Math.random() * (num2 - num1) + num1));
            }
            damage = randomNum(weapon.minAtk, weapon.maxAtk);

            //if target is dead
            let targetHealth = rows[1].health;

            //steal ratio of items
            const r = rows[1];
            const ratio = 0.4;
            
            //weapons
            let Istick = Math.floor(r.stick * ratio);
            let Iknife = Math.floor(r.knife * ratio);
            let Isword = Math.floor(r.sword * ratio);
            let Ilightsaber = Math.floor(r.lightsaber * ratio);
            let Ibasketball = Math.floor(r.basketball * ratio);
            let Ipistol = Math.floor(r.pistol * ratio);
            let Iblaster = Math.floor(r.blaster * ratio);
            let Isniper = Math.floor(r.sniper * ratio);

            //heals
            let Imini = Math.floor(r.miniPotion * ratio);
            let Ihp = Math.floor(r.healthPotion * ratio);
            let Imax = Math.floor(r.maxPotion * ratio);
            let Ioverdose = Math.floor(r.overdosePotion * ratio);

            if (targetHealth - damage <= 0) {
                //reset health, take weapon, give kill
                con.query(`UPDATE Noodle SET health = 100 WHERE id = ${target}`);
                con.query(`UPDATE Noodle SET ${weapon.name} = ${weapon.name} - 1 WHERE id = ${message.author.id}`);
                con.query(`UPDATE Noodle SET kills = kills + 1 WHERE id = ${message.author.id}`);

                //take 1% of coins, give 
                con.query(`UPDATE Noodle SET cur = cur - ${targetCur} WHERE id = '${target}'`);
                con.query(`UPDATE Noodle SET cur = cur + ${targetCur} WHERE id = '${message.author.id}'`);

                //give 50% of weapons
                con.query(`UPDATE Noodle SET stick = stick + ${Istick}, knife = knife + ${Iknife}, sword = sword + ${Isword}, lightsaber = lightsaber + ${Ilightsaber}, basketball = basketball + ${Ibasketball}, pistol = pistol + ${Ipistol}, blaster = blaster + ${Iblaster}, sniper = sniper + ${Isniper}, miniPotion = miniPotion + ${Imini}, healthPotion = healthPotion + ${Ihp}, maxPotion = maxPotion + ${Imax}, overdosePotion = overdosePotion + ${Ioverdose} WHERE id = ${message.author.id}`);
                
                //take 50% of weapons 
                con.query(`UPDATE Noodle SET stick = stick - ${Istick}, knife = knife - ${Iknife}, sword = sword - ${Isword}, lightsaber = lightsaber - ${Ilightsaber}, basketball = basketball - ${Ibasketball}, pistol = pistol - ${Ipistol}, blaster = blaster - ${Iblaster}, sniper = sniper - ${Isniper}, miniPotion = miniPotion - ${Imini}, healthPotion = healthPotion - ${Ihp}, maxPotion = maxPotion - ${Imax}, overdosePotion = overdosePotion - ${Ioverdose} WHERE id = ${target}`);

                const invEmbed = {
                    color: 0x92C6DD,
                    author: {
                        name: `${message.author.username} has killed ${targetNoID.username} with a ${weapon.name}! Looted Items:`,
                    },
                    fields: [
                        {
                            name: "--Weapons Tier 1--",
                            value: `Sticks: ${Istick}\nKnives: ${Iknife}\nSwords: ${Isword}\nLightsabers: ${Ilightsaber}`,
                            inline: true,
                        },
                        {
                            name: "--Weapons Tier 2--",
                            value: `Basketballs: ${Ibasketball}\nPistols: ${Ipistol}\nBlasters: ${Iblaster}\nSnipers: ${Isniper}`,
                            inline: true,
                        },
                        {
                            name: "--Health Items--",
                            value: `Mini Potions: ${Imini}\nHealth Potions: ${Ihp}\nMax Potions: ${Imax}\nOverdose Potions: ${Ioverdose}`,
                            inline: true,
                        },
                    ],
                };

                message.channel.send(`<@${target}>, you have been killed! Your health has been reset to 100 and you lost ${commas(targetCur)} coins to <@${message.author.id}>.`);
                message.channel.send({ embed: invEmbed });
            }
            else {
                message.channel.send(`<@${message.author.id}> attacked <@${target}> for ${damage} health with a ${weapon.name}! They now have ${targetHealth-damage} health left!`);
                con.query(`UPDATE Noodle SET health = health - ${damage} WHERE id = ${target}`);
                con.query(`UPDATE Noodle SET ${weapon.name} = ${weapon.name} - 1 WHERE id = ${message.author.id}`);
            }
        })
	},
};
