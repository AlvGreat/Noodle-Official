module.exports = {
	name: 'say',
    description: 'Make the bot say something!',
    aliases: [],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	execute(message, args) {
        if(message.author.id != "304393518816952321") return;
        
        message.delete();
        message.channel.send(message.content.slice(4)); 
	},
};