const mysql = require("mysql");
const { prefix } = require("../../config.json");

module.exports = {
    name: 'kill',
    description: 'Kill someone and make them lose all their coins! Warning, this comes with a huge price!',
    aliases: [],
    guildOnly: true,
    usage: '[req: user]',
    cooldown: 172800, //2 days

    execute(message, args, con) {
        return message.channel.send("This command is currently disabled");
        
        if(!message.mentions.users.first()) {
            con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);
            return message.channel.send(`Wow, <@${target}> congratulations on killing yourself, you've now lost everything.`); 
        }
        else if(message.mentions.users.first().id == message.author.id) {
            con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);
            return message.channel.send(`Wow, <@${target}> congratulations on killing yourself, you've now lost everything.`); 
        }
        //if they don't mention themselves, then we can keep going

        let target = message.mentions.users.first().id; 

        con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}' UNION SELECT * FROM Noodle WHERE id = '${target}'`, (err, rows) => {
            //rows[0] is going to be the author
            //rows[1] is going to be the target
            if(err) throw err;
            if(!rows[1]) return message.channel.send("Error: one or more users do not have any data in the bot.");

            let authorAmt = rows[0].cur;
            let targetAmt = rows[1].cur;

            if(authorAmt > targetAmt) {
                con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${target}`);
                con.query(`UPDATE Noodle SET cur = 0 WHERE id = ${message.author.id}`);
                message.channel.send(`Wonk Wonk, <@${target}>, you were killed by <@${message.author.id}>.\n<@${message.author.id}> AND <@${target}>, you've both lost all your coins. Was it worth it?`); 
            }
            else {
                return message.channel.send(`<@${message.author.id}> do you think killing someone is easy? Come back when you have more coins then <@${target}> smh`); 
            }
        });
    }
};