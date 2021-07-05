const superagent = require("superagent");

module.exports = {
    name: 'cat',
    description: 'Grabs a random post from r/cats',
    aliases: [],
    guildOnly: false,
    cooldown: 1,
    execute(message, args) {

        getRedditPost();

        async function getRedditPost(){
            try{
                const response = await superagent.get('https://www.reddit.com/r/cats/random.json');
                const wantedData = _returnPost(response);
                const postEmbed = {
                    color: 0x00688B,
                    title: `${wantedData.title}. Posted on r/cats`,
                    url: `https://www.reddit.com${wantedData.permalink}`,
                    author:{
                        name: `/u/${wantedData.author}`,
                        url: `https://www.reddit.com/user/${wantedData.author}`,
                    },
                    image:{
                        url: `${wantedData.url}`,
                    },

                    footer:{
                           text: `Upvotes: ${wantedData.ups} | Comments: ${wantedData.comments}` 
                    }

                }
                message.channel.send({embed: postEmbed});
                
            }
            catch(error){
                message.channel.send(`Something went wrong with r/cats`)
            }
        };
        
        function _returnPost(response){
            const jsonBody = [response.body];
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
            wantedData.comments = postData.num_comments;
        
            return wantedData;
        }
	},
};

