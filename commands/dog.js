const fetch = require('node-fetch');

module.exports = {
	name: 'dog',
    description: 'Returns a random image of a dog!',
    aliases: [],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	async execute(message, args) {
        try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            // console.log(res);
            // console.log("----------");
            const json = await res.json();
            // console.log(json);

            message.channel.send(json.message);
            } catch (e) {
            message.channel.send('Could not obtain dog picture :confused: ');
            return console.error(e);
            }
	},
};