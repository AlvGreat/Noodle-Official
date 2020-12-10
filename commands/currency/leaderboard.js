const mysql = require("mysql");
const { prefix } = require('../../config.json');

module.exports = {
    name: 'leaderboard',
    description: `Shows a leaderboard for kills, xp, or coins. Use with ${prefix}lb [optional: xp || kills || coins]`,
    aliases: ["lb", "top"],
    guildOnly: true,
    usage: '',
    cooldown: 1,
    execute(message, args, con) {        
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        
        if(args[0] === "xp") {
            con.query(`SELECT * FROM Noodle ORDER BY xp DESC`, (err, rows) => {
                if (err) throw err;
                
                if(!rows[4]) return message.channel.send("Not enough people are ranked to display leaderboard");
                
                const lbEmbed = {
                    color: 0x006F9F,
                    author: {
                        name: 'Leaderboard for most xp!',
                    },
                    fields: [
                        {
                            name: "#1: ",
                            value: `<@${rows[0].id}>: **Level ${Math.floor(rows[0].xp/3000)}**, ${commas(rows[0].xp)} total xp!`,
                            inline: false,
                        },
                        {
                            name: "#2: ",
                            value: `<@${rows[1].id}>: **Level ${Math.floor(rows[1].xp/3000)}**, ${commas(rows[1].xp)} total xp!`,
                            inline: false,
                        },
                        {
                            name: "#3: ",
                            value: `<@${rows[2].id}>: **Level ${Math.floor(rows[2].xp/3000)}**, ${commas(rows[2].xp)} total xp!`,
                            inline: false,
                        },
                        {
                            name: "#4: ",
                            value: `<@${rows[3].id}>: **Level ${Math.floor(rows[3].xp/3000)}**, ${commas(rows[3].xp)} total xp!`,
                            inline: false,
                        },
                        {
                            name: "#5: ",
                            value: `<@${rows[4].id}>: **Level ${Math.floor(rows[4].xp/3000)}**, ${commas(rows[4].xp)} total xp!`,
                            inline: false,
                        }
                    ],
                };
                message.channel.send({ embed: lbEmbed });
            });
        }
        else if (args[0] === "kills") {
            con.query(`SELECT * FROM Noodle ORDER BY kills DESC`, (err, rows) => {
                if (err) throw err;
                
                if(!rows[4]) return message.channel.send("Not enough people are ranked to display leaderboard");
                
                const lbEmbed = {
                    color: 0x006F9F,
                    author: {
                        name: 'Leaderboard for most kills!',
                    },
                    fields: [
                        {
                            name: "#1: ",
                            value: `<@${rows[0].id}>: ${rows[0].kills} kills!`,
                            inline: false,
                        },
                        {
                            name: "#2: ",
                            value: `<@${rows[1].id}>: ${rows[1].kills} kills!`,
                            inline: false,
                        },
                        {
                            name: "#3: ",
                            value: `<@${rows[2].id}>: ${rows[2].kills} kills!`,
                            inline: false,
                        },
                        {
                            name: "#4: ",
                            value: `<@${rows[3].id}>: ${rows[3].kills} kills!`,
                            inline: false,
                        },
                        {
                            name: "#5: ",
                            value: `<@${rows[4].id}>: ${rows[4].kills} kills!`,
                            inline: false,
                        }
                    ],
                };
                message.channel.send({ embed: lbEmbed });
            });
        }
        else if (args[0] == "coins") {
            con.query(`SELECT * FROM Noodle ORDER BY cur DESC`, (err, rows) => {
                if (err) throw err;
                
                if(!rows[4]) return message.channel.send("Not enough people are ranked to display leaderboard");
                
                if (rows[0].badge2 == 0) {
                    con.query(`UPDATE Noodle SET badge2 = 1 WHERE id = ${rows[0].id}`)
                }
                
                const lbEmbed = {
                    color: 0x92C6DD,
                    author: {
                        name: 'Leaderboard for most coins!',
                    },
                    fields: [
                        {
                            name: "#1: ",
                            value: `<@${rows[0].id}>: ${commas(rows[0].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#2: ",
                            value: `<@${rows[1].id}>: ${commas(rows[1].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#3: ",
                            value: `<@${rows[2].id}>: ${commas(rows[2].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#4: ",
                            value: `<@${rows[3].id}>: ${commas(rows[3].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#5: ",
                            value: `<@${rows[4].id}>: ${commas(rows[4].cur)} coins!`,
                            inline: false,
                        }
                    ],
                };
                message.channel.send({ embed: lbEmbed });
                
            });
        }
        else {
            con.query(`SELECT * FROM Noodle ORDER BY cur DESC`, (err, rows) => {
                if (err) throw err;
                
                if(!rows[4]) return message.channel.send("Not enough people are ranked to display leaderboard");
                
                if (rows[0].badge2 == 0) {
                    con.query(`UPDATE Noodle SET badge2 = 1 WHERE id = ${rows[0].id}`)
                }
                
                const lbEmbed = {
                    color: 0x92C6DD,
                    author: {
                        name: 'Leaderboard for most coins!',
                    },
                    fields: [
                        {
                            name: "#1: ",
                            value: `<@${rows[0].id}>: ${commas(rows[0].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#2: ",
                            value: `<@${rows[1].id}>: ${commas(rows[1].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#3: ",
                            value: `<@${rows[2].id}>: ${commas(rows[2].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#4: ",
                            value: `<@${rows[3].id}>: ${commas(rows[3].cur)} coins!`,
                            inline: false,
                        },
                        
                        {
                            name: "#5: ",
                            value: `<@${rows[4].id}>: ${commas(rows[4].cur)} coins!`,
                            inline: false,
                        }
                    ],
                };
                message.channel.send({ embed: lbEmbed });
                
            });
        }
    },
};