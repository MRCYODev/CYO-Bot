const db = require('../../models/warns')

module.exports = {
    name : 'remove-all-warns',
    aliases: null,
    description: 'Remove all warns from user',
    usage: '(@user#1234)',
    timeout: 10000,
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **ADMINISTRATOR** Permissions to remove all warns from someone <a:x_:789158785540948008> "
          }})
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send({embed: {
            color: 10038562,
            description: "Provide an Member to warn <a:x_:789158785540948008> "
          }})
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send({embed: {
                    color: 10038562,
                    description: `Cleared ${user.user.tag}'s warns <a:check:789158626459385917>`
                  }})
            } else {
                message.channel.send({embed: {
                    color: 10038562,
                    description: 'This user does not have any warns in this server! <a:x_:789158785540948008> '
                  }})
            }
        })
    }
}
