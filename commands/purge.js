const { prefix } = require('../config.json');

module.exports = {
	name: 'purge',
    description: 'Deletes a specified number of messages from [1,99]',
    aliases: ['delete', 'prune'],
    guildOnly: true,
    usage: '[req: amount]',
    cooldown: 1,
	execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.reply("You do not have permissions to use this command");
        }

        const amount = parseInt(args[0]);
        
        if (isNaN(amount)) {
            return message.reply(`That isn't a valid number.\nCommand usage: ${prefix}purge [number of msgs]`);
        } 
        else if (amount < 1 || amount > 99) {
            return message.reply('Can only delete a number between 1 and 99.');
        } 
        else {
            message.channel.bulkDelete(amount + 1, true).catch(err => {
                console.error(err);
                message.channel.send('Error: cannot delete messages.');
            });
        }
	},
};