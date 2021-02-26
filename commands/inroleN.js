const { prefix } = require("../config.json");

module.exports = {
	name: 'inrolen', 
    description: 'See what users are in a role! [nickname version]',
    aliases: [],
    guildOnly: false,
    usage: '[role name]',
    cooldown: 1,
	execute(message, args) {
        return message.channel.send("This command is currently disabled.");

        //this is for the name argument
        let roleNameArg = message.content.slice(prefix.length + 8);
        
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
            //console.log(user.user);
            arr.push(`<@${user.user.id}>`);
        });
        let memberList = arr.join(', ');

        message.channel.send(`${memberList.substring(0, 1999)}`);
        message.channel.send(`${memberList.substring(1999)}`);
	},
};


