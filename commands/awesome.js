module.exports = {
    name : 'awesome',
    description: 'Just to let you know that you\'re an awesome human being',
    aliases: [],
    guildOnly: false,
    usage: '<optional: @user>',
    cooldown: 1,
    execute(message, args){
        let target = message.mentions.users.first() || message.author;
        message.channel.send("<@" + target.id + "> You\'re an awesome human being :100:");
    },
};
