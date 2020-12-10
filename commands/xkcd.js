const superagent = require('superagent');
const command_config = require('./command_config.json');

module.exports = {
	name: 'xkcd',
    description: 'Grabs a random xkcd comic!',
    aliases: [],
    guildOnly: false,
    usage: '<opt: current> or <opt: comic number>',
    cooldown: 1,
	execute(message, args) {

        //API: https://xkcd.com/json.html
        //Grab Lastest: https://xkcd.com/info.0.json
        //Grab Specific: https://xkcd.com/${comic_id}/info.0.json
   
        xkcdPost();

        async function xkcdPost(){
                try{
                    let response;
                    if(args[0] === 'current' || args[0] === 'cr'){
                        response = await superagent.get(`https://xkcd.com/info.0.json`);
                        command_config.xkcdNum = response.body.num;
                        message.channel.send(`\`XKCD #${command_config.xkcdNum}\` is today's comic! I went ahead and refreshed my logs! `);
                    }
                    else{
                        let comic_id;
                        let noNumArgs = true;
                        
                        //if not a number or it's more than the amount of comics
                        if(!(isNaN(args[0])) && args[0] <= command_config.xkcdNum){
                            comic_id = args[0];  
                            noNumArgs = false;
                        }
                        else {
                            comic_id = Math.floor(Math.random() * (command_config.xkcdNum - 1 + 1)) + 1;
                        }

                        //if invalid, choose a random one
                        if(args[0] && noNumArgs){
                            message.channel.send(`\`${args[0]}\` is invalid so I just randomly selected XKCD #${comic_id}. Note that there are only \`${command_config.xkcdNum}\` comics!`)
                        }

                        response = await superagent.get(`https://xkcd.com/${comic_id}/info.0.json`);
                    }
                    return post(response.body);
                }
                catch(error){
                    console.log(error);
                    return message.channel.send(`Hmm. It seems I could not retrive an xkcd comic! Note that there are only \`${command_config.xkcdNum}\` comics!`)
                }
        };
        
        function post(data){
            const postEmbed = {
                color: 0x000000,
                title: `${data.title}`,
                url: `https://xkcd.com/${data.num}/`,
                image:{
                    url: `${data.img}`,
                },
                footer:{
                       text: `Posted on ${data.month}/${data.day}/${data.year}` 
                }

            }
            return message.channel.send({embed: postEmbed});
        }
	},
};

