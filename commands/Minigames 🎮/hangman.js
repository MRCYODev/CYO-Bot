
const { hangman } = require('reconlx')

module.exports = {
    name: "hangman",
    aliases: ['hanman'],
    usage: "(channel) [word]",
    description: "Hangman mini game",
    timeout: 10000,
    
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **MANAGE_MESSAGES** Permissions to play hangman <a:x_:789158785540948008> "
          }})
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send({embed: {
            color: 10038562,
            description: "Please specify a **channel** <a:x_:789158785540948008> "
          }})
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send({embed: {
            color: 10038562,
            description: "Please specify a **word** to guess. <a:x_:789158785540948008> "
          }})

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}

