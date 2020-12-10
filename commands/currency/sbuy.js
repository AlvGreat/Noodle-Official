const mysql = require("mysql");
const { prefix } = require("../../config.json");

module.exports = {
	name: 'sbuy',
    description: `Buy a shield! It will cost you 6% of your coins, but you'll be able to protect yourself from robs!\n${prefix}sbuy 2 will give you a better shield for 12% of your coins!`,
    aliases: [],
    guildOnly: true,
    cooldown: 2,
	execute(message, args, con) {
        function commas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        con.query(`SELECT * FROM Noodle WHERE id = ${message.author.id}`, (err, rows) => {
            if(err) throw err;

            if (rows[0].cur < 1000000) return message.channel.send("You must have at least 1 million coins to buy a shield");

            if(!args[0] || args[0] == 1) {
                con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {
                    if(err) throw err;
                    
                    if(!rows[0]) return message.channel.send("This user has not used the currency system yet!");
                    
                    shield = rows[0].shield;
                    if (shield == 1 || shield == 2) return message.channel.send("You already have a shield active!");
    
                    //take 6% of coins
                    con.query(`UPDATE Noodle SET cur = cur * 0.94 WHERE id = ${message.author.id}`);
            
                    sql = `UPDATE Noodle SET shield = 1 WHERE id = '${message.author.id}'`;
                    message.reply(`Congrats, you have bought a shield for ${commas((rows[0].cur * 0.06).toFixed(3))} coins! (6%)`);
                    con.query(sql);
                    //con.query(sql, console.log);
                });
            }
            else if (args[0] == 2) {
                con.query(`SELECT * FROM Noodle WHERE id = '${message.author.id}'`, (err, rows) => {
                    if(err) throw err;
                    
                    if(!rows[0]) return message.channel.send("This user has not used the currency system yet!");
                    
                    shield = rows[0].shield;
                    if (shield == 2) return message.channel.send("You already have an upgraded shield active!");
    
                    //take 12% of coins
                    con.query(`UPDATE Noodle SET cur = cur * 0.88 WHERE id = ${message.author.id}`);
            
                    sql = `UPDATE Noodle SET shield = 2 WHERE id = '${message.author.id}'`;
                    message.reply(`Congrats, you have bought an upgraded shield ${commas((rows[0].cur * 0.12).toFixed(3))} coins! (12%)`);
                    con.query(sql);
                    //con.query(sql, console.log);
                });
            }
            
        })
	},
};
