const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roles', 
    description: 'Simply react to a role to receive it!',
    aliases: [],
    guildOnly: false,
    cooldown: 1,
    async execute(message, args) {
        
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
        sentEmbed.delete ({timeout: 20000}); //delete the server role in 20 seconds.


    }
};