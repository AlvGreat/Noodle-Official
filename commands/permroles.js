const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'permroles', 
    description: 'Simply react to a role to receive it! -- this is the permanant version that doesn\'t delete. Must have manage channels permission',
    aliases: [],
    guildOnly: false,
    cooldown: 1,
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.reply("You do not have permissions to use this command");
        }
        
        let embed = new MessageEmbed()
        .setTitle('Server Roles')
        .setDescription('🎮 - Gamers\n' + '👾 - Advance\n' + '💻 - Beginners\n' + '🎲 - Coders\n' + '📲 - Project Team')
        .setColor('00688B')
        let sentEmbed = await message.channel.send(embed);
        sentEmbed.react('🎮')
        sentEmbed.react('👾')
        sentEmbed.react('💻')
        sentEmbed.react('🎲')
        sentEmbed.react('📲')
    }
};