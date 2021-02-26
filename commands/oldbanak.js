module.exports = {
	name: 'oldbanak',
    description: 'OG banak command! 1% chance that it\'ll legit ban ak.',
    aliases: ['obanak', 'obk'],
    guildOnly: true,
    usage: '',
    cooldown: 0,
	execute(message, args, con) {
        return message.channel.send("This command is currently disabled.");
        
        const num = Math.random();

        message.channel.send(`Your number was: ${num.toFixed(4)}. Your number has to be < 0.01 to ban ak.`);

        if(num < 1) {
            try { 
                message.guild.member("619723116435734530").kick("Akalpit has been kicked by Noodle's banak command.");
                message.channel.send("You've successfully kicked ak from the server! :tada: :unlimitedpower:");
            }
            catch(e) {
                console.log(e);
                return message.channel.send("Something went wrong");
            }
        }
	},
};