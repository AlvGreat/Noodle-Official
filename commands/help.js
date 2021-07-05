const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: `Displays a list of all my commands. Do ${prefix}help [command name] for more info about a certain command`,
    aliases: [],
    guildOnly: false,
	usage: '[command name]',
	cooldown: 1,
	execute(message, args) {
        const { curCommands, invCommands, regCommands } = message.client;
        const curCommandsList = curCommands.map(command => command.name).join(', '); 
        const regCommandsList = regCommands.map(command => command.name).join(', '); 
        const invCommandsList = invCommands.map(command => command.name).join(', '); ;

        if (!args.length) {
            const helpEmbed = {
                color: 0x92C6DD,
                author: {
                    name: `Noodle's list of commands:`
                },
                fields: [
                    {
                        name: 'Regular Commands',
                        value: regCommandsList,
                        inline: false,
                    },
            
                    {
                        name: 'Currency System Commands',
                        value: curCommandsList,
                        inline: false,
                    },
            
                    {
                        name: 'Inventory System Commands',
                        value: invCommandsList,
                        inline: false,
                    },
                ],
            };

            return message.channel.send({ embed: helpEmbed });
        }
        
        //if the user provided a specific command, then provide info on that command
        const data = [];
        const { commands } = message.client;
        
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        
        data.push(`**Name:** ${command.name}`);
        
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        data.push(`**Cooldown:** ${command.cooldown} second(s)`);
        
        message.channel.send(data, { split: true });

	},
};