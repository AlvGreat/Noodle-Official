const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    //this will check if a message starts with the bot prefix or if the message sender is a Discord bot themselves
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //will take messages from Discord and check if they match the commands below 
    const args = message.content.slice(prefix.length).split(' '); //acm
    const command = args.shift().toLowerCase(); 

    //uncomment if you want to log every message to the console to check if bot is working
    //console.log(message.content);

    //ping message
    if (command === 'ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong! :ping_pong:');
    }

    else if (command === "acm") {
        message.channel.send("https://acm-calstatela.com/" + "\nhttps://discord.com/invite/wX58JRv");
    }

    //return users' avatars
    else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
    
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    }

    //delete messages
    else if (command === 'prune' || command === 'purge' || command === 'delete') {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } 
        else if (amount < 1 || amount > 99) {
            return message.reply('Can only delete a number between 1 and 99.');
        } 
        else {
            message.channel.bulkDelete(amount + 1, true).catch(err => {
                console.error(err);
                message.channel.send('Error: cannot delete messages.');
            });
        }
    }
});

client.login(token);