const db = require('../../models/warns')

module.exports = {
    name : 'remove-warn',
    aliases: null,
    description: 'Remove Warn From User',
    usage: '(@user#1234)',
    timeout: 10000,
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **ADMINISTRATOR** Permissions to remove warn from someone <a:x_:789158785540948008> "
          }})
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send({embed: {
            color: 10038562,
            description: "Provide an Member to warn <a:x_:789158785540948008> "
          }})
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send({embed: {
                    color: 10038562,
                    description: "deleted the warn <a:check:789158626459385917>"
                  }})
                data.save()
            } else {
                message.channel.send({embed: {
                    color: 10038562,
                    description: 'This user does not have any warns in this server! <a:x_:789158785540948008> '
                  }})
            }
        })
    }
}
