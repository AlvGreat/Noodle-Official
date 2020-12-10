const fetch = require('node-fetch');

module.exports = {
	name: 'joke',
    description: 'Returns a random joke!',
    aliases: [],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	async execute(message, args) {
        try {
            const res = await fetch('https://official-joke-api.appspot.com/random_joke');
            const json = await res.json();

            message.channel.send(json.setup + "\n\n" + json.punchline);
            } 
            catch (e) {
            message.channel.send('Could not obtain joke :confused: ');
            return console.error(e);
            }
	},
};

