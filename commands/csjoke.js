const fetch = require('node-fetch');

module.exports = {
	name: 'csjoke',
    description: 'Returns a random computer science themed joke!',
    aliases: [],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	async execute(message, args) {
        try {
            const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
            const json = await res.json();

            message.channel.send(json[0].setup + "\n\n" + json[0].punchline);
            } 
            catch (e) {
            message.channel.send('Could not obtain joke :confused: ');
            return console.error(e);
            }
	},
};
