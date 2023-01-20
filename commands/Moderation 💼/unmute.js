const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute',
    aliases: null,
    usage: '(@user#1234) or (ID)',
    description: "unmute member from current server",
    timeout: 10000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **MANAGE_MESSAGES** Permissions to unmute someone <a:x_:789158785540948008> "
          }})
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send({embed: {
            color: 10038562,
            description: "Please Provide member to unmute <a:x_:789158785540948008> "
          }})

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
       
        await Member.roles.remove(role)

        message.channel.send({embed: {
            color: 3066993,
            description: `Succsess **${Member.displayName}** is now Unmuted. <a:check:789158626459385917>`
          }})
    }
}
