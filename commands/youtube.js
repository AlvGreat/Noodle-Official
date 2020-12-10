module.exports = {
	name: 'youtube',
    description: 'Plays and stops a youtube video, audio only, in a voice channel',
    aliases: ['yt'],
    guildOnly: false,
    usage: '',
    cooldown: 1,
	execute(message, args) {
        //Extra required dependencies
        //npm install ffmpeg-static
        //npm install @discordjs/opus
        //npm install ytdl-core@latest

        const ytdl = require("ytdl-core");
        // 'voiceChannel' checks if you are in a voice Channel, returns True if you are and false if not.
        let voiceChannel = message.member.voice.channel;

        //This if statement checks and lets the user know to join a server.
        if(!voiceChannel){
            message.reply('You need to be in a voice channel to play a youtube audio video only!');
            return;
        }   

        
        switch(args[0].toLowerCase()){
            //This case is in case no command after 'youtube' is given. 
            case null || undefined:
                message.reply("Provide a command. Valid commands are: 'play' or 'stop'. " );
                break;

            case 'play':
                //This if statement whether the url is a youtube link
                if(!args[1] || args[1].indexOf("https://www.youtube.com/") === -1 ){
                    message.reply('Provide a working Youtube link!');
                    return;
                }

                //If the the link is okay and you are in a voice channel then the bot joins your channel..
                voiceChannel.join().then(connection =>{
                    // This bottom line gets the provided url code and downloads the audioonly
                    let dispatcher = connection.play(ytdl(args[1], {filter: 'audioonly'}));
                    //It should start playing by now, a message will appear in the terminal saying 'music is starting'.
                    dispatcher.on("start", ()=>{
                        console.log("music is starting...");
                    });
                });
                break;

            //Case 'stop' basically leaves the channel.
            case 'stop':

                //Bot just leaves
                voiceChannel.leave();
                break;

            // if a command other than 'play' or 'stop' is used, it should give the bottom message.
            default:
                message.reply(`Command ${args[0]} is not valid. Try 'play' or 'stop' after youtube.`)
        }                      
    },    
};