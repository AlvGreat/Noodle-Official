const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
    name: 'profile',
    description: 'Shows your stats, including how much of your life you\'ve wasted',
    aliases: ["pf"],
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
            return message.channel.send(`Invalid argument provided. Usage: ${prefix}profile [optional: ping someone or provide someone's ID]`);
        }

        con.query(`SELECT * FROM Noodle WHERE id = '${target.id}'`, (err, rows) => {
            
            if (err) throw err;
            
            if(!rows[0]) return message.channel.send("The user id you provided is invalid.");
            
            //xp
            let xp = rows[0].xp;
            let comXP = commas(xp);
            
            //level
            let level = Math.floor(xp / 3000);
            let remXP = xp % 3000;
            
            //coins
            let coins = rows[0].cur;
            coins = commas(coins);
            
            //multiplier
            let multiplier = rows[0].multiplier;
            
            //inventory
            let health = rows[0].health;
            let kills = rows[0].kills;
            
            //badges
            let badges = "";
            let r = rows[0];
            
            let counter = 0;
            if(target.id == 304393518816952321 /* || target.id == 252536683944214531 */) {
                badges += ":zap: Official bot owner\n"
            }
            
            if(r.badge1 >= 5) {
                badges += ":boom: Destroyed the bot's currency system 5 or more times! Times beaten: " + r.badge1 + "\n";
                counter++;
                counter++;
            }
            else if(r.badge1 > 0) {
                badges += ":money_with_wings: Successfully broke the currency system! Times beaten: " + r.badge1 + "\n";
                counter++; 
            }
            
            
            if(r.badge2 == 1) {
                badges += ":first_place: Became the richest player in the bot at one point\n"
                counter++;
            }
            if(r.badge3 == 1) {
                badges += ":hammer: Has banned akalpit successfully\n";
                counter++;
            }
            if(r.badge4 == 1) {
                badges += ":star: Has gotten over a 1.45% multiplier in the bot before\n";
                counter++;
            }
            if(r.badge5 == 1) {
                badges += ":eyes: Has found the search jackpot before\n";
                counter++;
            }
            
            if(r.badge6 >= 5) {
                badges += ":diamond_shape_with_a_dot_inside: Won the slots jackpot 5 or more times! Times won: " + r.badge6 + "\n";
                counter++;
                counter++;
            }
            else if(r.badge6 > 0) {
                badges += ":large_blue_diamond: Won the slots jackpot before! Times won: " + r.badge6 + "\n";
                counter++;
            }
            
            if (r.badgeE1 > 0) {
                badges += "<:unlimitedpower:721211334523486218> Winner of the first speed-gambling event! [unobtainable]\n";
            }
            if (counter == 8) {
                badges += ":ramen: Obtained every badge possible in the bot!\n";
            }
            if (badges == "") {
                badges += "none :(";
            }
            let shield; 
            
            if(r.shield == 0) {
                shield = "disabled";
            } 
            else if (r.shield == 1) {
                shield = "regular shield active! :shield:"
            }
            else if (r.shield == 2) {
                shield = "reinforced shield active! :shield:"
            }

            
            //id mode
            let avatar;
            if (!id) {
                avatar = target.displayAvatarURL({ format: "png", dynamic: true });
            }

            let name = `User ID: ${target.id}`;

            if(!id) { 
                name = target.username;
            }

            const xpEmbed = {
                color: 0x92C6DD,
                author: {
                    name: `${name}\nLevel ${level}`,
                    icon_url: avatar
                },
                fields: [
                    {
                        name: "--Stats--",
                        value: `Health: ${health}\nKills: ${kills}`,
                        inline: false,
                    },
                    {
                        name: "--Experience--",
                        value: `XP to next level: ${remXP}\nTotal XP: ${comXP}`,
                        inline: false,
                    },
                    {
                        name: "--Currency--",
                        value: `Multiplier: ${multiplier}%\nCoins: ${coins}\nShield: ${shield}`,
                        inline: false,
                        
                    },
                    {
                        name: "--Badges--",
                        value: badges
                        
                    }
                ],
            };
            
            message.channel.send({ embed: xpEmbed });
            //message.channel.send("<@" + target + "> has " + comXp + " xp! :tada:");
        });
    },
};