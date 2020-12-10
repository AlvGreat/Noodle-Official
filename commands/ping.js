module.exports = {
	name: 'ping',
    description: 'Simply replies to show that the bot is working!',
    aliases: [],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	execute(message, args) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong! :ping_pong:'); 
	},
};