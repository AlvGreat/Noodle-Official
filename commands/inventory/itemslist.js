const mysql = require("mysql");
const { prefix } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const w = require("../../items.js");

module.exports = {
	name: 'itemslist',
    description: `Show list of weapons, health items, and their information`,
    aliases: ["ilist"],
    guildOnly: true,
    cooldown: 2,
	execute(message, args, con) {

        //description
        let desc = "";

        desc += "Tier 1 Items:\n"
        for(let i = 0; i < w.tier1.length; i++) {
            desc += `Weapon: ${w.tier1[i].name}  |  Min Attack/Heal: ${w.tier1[i].minAtk}  |  Max Attack/Heal: ${w.tier1[i].maxAtk}\n`;
        }

        desc += "\nTier 2 Items:\n"
        for(let i = 0; i < w.tier2.length; i++) {
            desc += `Weapon: ${w.tier2[i].name}  |  Min Attack/Heal: ${w.tier2[i].minAtk}  |  Max Attack/Heal: ${w.tier2[i].maxAtk}\n`;
        }

        let embed = new MessageEmbed()
        .setTitle('--List of Items--')
        .setDescription(desc)
        .setColor(0x92C6DD)
        message.channel.send(embed);

	},
};
