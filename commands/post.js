const superagent = require('superagent');
const command_config = require('./command_config');

module.exports = {
	name: 'post',
    description: 'Grabs a random post from r/all. Give subreddit as argument, command will keep displaying post from giuven subreddit until a new one is given.',
    aliases: ["reddit", "subreddit"],
    guildOnly: false,
    cooldown: 1,
	execute(message, args) {
        let chosen_subreddit = command_config.default;

        if(!(command_config.previous === "")){
            chosen_subreddit = command_config.previous;
        }

        if(!(args.length == 0)){
            chosen_subreddit = args[0];
            command_config.previous = args[0];
        }

        getRedditPost(chosen_subreddit);

        async function getRedditPost(chosen_subreddit){
            try{
                const response = await superagent.get(`https://www.reddit.com/r/${chosen_subreddit}/random.json`)
                const wantedData = _returnPost(response);
                const postEmbed = {
                    color: 0x00688B,
                    title: `${wantedData.title}\nPosted on r/${wantedData.subreddit}`,
                    url: `https://www.reddit.com${wantedData.permalink}`,
                    author:{
                        name: `/u/${wantedData.author}`,
                        url: `https://www.reddit.com/user/${wantedData.author}`,
                    },
                    image:{
                        url: `${wantedData.url}`,
                    },

                    footer:{
                           text: `👍${wantedData.ups}  👎${wantedData.downs}   |   ✉ ${wantedData.comments}` 
                    }

                }
                message.channel.send({embed: postEmbed});
                
            }
            catch(error){
                message.channel.send(`/r/${chosen_subreddit} does not exist or is misspelled`)
                command_config.previous = ""
            }
        };
        
        function _returnPost(response){
            const jsonBody = response.body;
            const allData  = jsonBody[0];
            const listingData = allData.data;
            const childData = listingData.children.pop();
            const postData = childData.data;
        
            const wantedData = {}
        
            wantedData.title = postData.title;
            wantedData.author = postData.author;
            wantedData.url = postData.url;
            wantedData.permalink = postData.permalink;
            wantedData.subreddit = postData.subreddit;
            wantedData.ups = postData.ups;
            wantedData.downs = postData.downs;
            wantedData.comments = postData.num_comments;
            
        
            return wantedData;
        }
	},
};

