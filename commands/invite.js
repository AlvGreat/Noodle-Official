module.exports = {
	name: 'invite',
    description: 'Sends invite link to bot!',
    aliases: [],
    guildOnly: false,
    cooldown: 1,
	execute(message, args) {
        if (message.author.id != "304393518816952321") return message.channel.send("This command is only available for the bot owner.");
        message.channel.send("https://discord.com/oauth2/authorize?client_id=697984301567836323&scope=bot&permissions=0");
	},
};