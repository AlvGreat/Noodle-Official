const { prefix } = require("../config.json");

module.exports = {
	name: 'inrole', 
    description: 'See what users are in a role!',
    aliases: [],
    guildOnly: false,
    usage: '[role name]',
    cooldown: 1,
	execute(message, args) {
        //this is for the name argument
        let roleNameArg = message.content.slice(prefix.length + 7);
            
        //keep checking for what type of input they have
        let role = message.mentions.roles.first();
        if(!role) {
            role = message.guild.roles.cache.find(r => r.id == args[0]);   
        }
        if(!role) {
            role = message.guild.roles.cache.find(r => r.name.toLowerCase() == roleNameArg.toLowerCase());   
        }
        if(!role) {
            return message.reply('That role does not exist!');
        }

        let arr = [];
        role.members.forEach(user => {
            arr.push(`${user.user.username}`);
        });
        let memberList = arr.join(', ');
        

        message.channel.send(`Member count: ${arr.length}\n__**List of members**__\n\n${memberList}`);
	},
};


