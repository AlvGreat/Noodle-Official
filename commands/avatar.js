module.exports = {
    name: 'avatar',
    description: 'Shows mentioned users\' avatars',
    aliases: ['icon', 'pfp'],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	execute(message, args) {
        let target = message.mentions.users.first() || message.author;

        const Embed = {
            color: 0x92C6DD,
            author: {
                name: `${target.username}'s avatar:`,
            },
            image:{
                url: `${target.displayAvatarURL({ format: "png", dynamic: true, size: 256 })}`,
            },
        };
        message.channel.send( { embed:Embed });
        
        /*
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
    
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
        */
	},
};
