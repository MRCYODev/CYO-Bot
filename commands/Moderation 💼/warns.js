const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warns',
    aliases: null,
    usage: null,
    description: null,
    timeout: 10000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **ADMINISTRATOR** Permissions to see warns <a:x_:789158785540948008> "
          }})
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send({embed: {
            color: 10038562,
            description: "Provide an Member to warn <a:x_:789158785540948008> "
          }})
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("RANDOM")
                )
            } else {
                message.channel.send({embed: {
                    color: 10038562,
                    description: "User Has No have Data/Warns <a:x_:789158785540948008> "
                  }})
            }

        })
    }
}
