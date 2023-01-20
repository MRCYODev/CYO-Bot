const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warn',
    aliases: null,
    usage: '(@user#1234)',
    description: 'Warn An Member',
    timeout: 10000,

    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **ADMINISTRATOR** Permissions to Warn someone <a:x_:789158785540948008> "
          }})
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send({embed: {
            color: 10038562,
            description: "Provide an Member to warn <a:x_:789158785540948008> "
          }})
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setDescription(`You have been warned for **${reason}** from __**${message.guild.name}**__`)
            .setColor("RED")
        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned **${user}** Reason: **${reason}**`).setColor('YELLOW')
        )
    }
}
