const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 1,
	execute(message, args) {

        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('__Here\'s a list of all my commands:__');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            
            return message.channel.send(data, { split: true })
            // //change to message.author.send if you want to send a dm
            // return message.channel.send(data, { split: true })
            //     .then(() => {
            //         // if (message.channel.type === 'dm') return;
            //         // message.reply('I\'ve sent you a DM with all my commands!');
            //     })
            //     .catch(error => {
            //         console.log("Help command error occurred:\n\n" + error);
            //         message.reply('An error occurred when executing this command!');
            //     });
        }
        
        //if the user provided a specific command, then provide info on that command
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        
        data.push(`**Name:** ${command.name}`);
        
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        data.push(`**Cooldown:** ${command.cooldown || 0.8} second(s)`);
        
        message.channel.send(data, { split: true });

	},
};