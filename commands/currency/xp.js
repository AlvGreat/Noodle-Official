const mysql = require("mysql");

module.exports = {
	name: 'xp',
    description: 'Shows your xp',
    aliases: ["experience"],
    guildOnly: true,
    cooldown: 1,
	execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        let target = message.mentions.users.first() || message.author;
        
       con.query(`SELECT * FROM Noodle WHERE id = ${target.id}`, (err, rows) => {
           if (err) throw err;

           if(!rows[0]) return message.channel.send("This user does not have enough information on record.");

           let xp = rows[0].xp;
           let comXP = commas(xp);
        
           let level = Math.floor(xp / 3000);
           let remXP = xp % 3000;
           
           const xpEmbed = {
            color: 0x92C6DD,
            author: {
                name: `${target.username}`,
                icon_url: target.displayAvatarURL({ format: "png", dynamic: true })
            },
            fields: [
                {
                    name: "--Experience--",
                    value: `Level: ${level}\nXP to next level: ${3000-remXP}\nTotal XP: ${comXP}`,
                    inline: false,
                },
            ]
            }   

            message.channel.send({ embed: xpEmbed });
           //message.channel.send("<@" + target + "> has " + comXp + " xp! :tada:");
       });
	},
};