module.exports = {
	name: 'acm', //{prefix}acm
    description: 'Send out an invite to ACM CSULA\'s official discord, as well as the website!',
    aliases: [],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	execute(message, args) {
		message.channel.send("https://acm-calstatela.com/" + "\nhttps://discord.com/invite/wX58JRv");
	},
};

