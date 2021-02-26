const playlistEmbed = {
    color: 0x92C6DD,
    author: {
        name: 'Shrimp and Noodles Playlist Links:',
        icon_url: 'https://i.imgur.com/fAdBf3B.jpg'
    },
    thumbnail: {
        //url: 'https://i.imgur.com/fAdBf3B.jpg',
    },

    fields: [
        {
            name: 'Main Playlist:',
            value: 'https://www.youtube.com/playlist?list=PLrwcmfgl_RFr2WikQnbxgwF1qZtXKDbd5',
            inline: false,
        },

        {
            name: 'Faves Playlist:',
            value: 'https://www.youtube.com/playlist?list=PLrwcmfgl_RFpDIEUh3h_AumYNuDYsPAOw',
            inline: false,
        },

        {
            name: 'Chinese Playlist:',
            value: 'https://www.youtube.com/playlist?list=PLrwcmfgl_RFqCEJ1agucYtTdh4XQi-yW5',
            inline: false,
        },
    
        {
            name: 'Lofi Livestream:',
            value: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            inline: false,    
        },

    ],
};

module.exports = {
	name: 'playlist',
    description: 'Displays *the* playlist. Only usable by playlist owners.',
    aliases: ["pl"],
    guildOnly: false,
    cooldown: 0,
    playlistEmbed: playlistEmbed,
	execute(message, args) {
        let noodleID = "304393518816952321";
        let shrimpyID = "338163317019377665";

        if(message.author.id != noodleID && message.author.id != shrimpyID) return message.channel.send("You do not have permission to use this command.");
        
        message.channel.send({ embed: playlistEmbed });  
    },
};
