const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    aliases: null,
    usage: '[@user#1234] (@role)',
    description: "Add Role in specified member",
    timeout: 10000,
    
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **MANAGE_ROLES** permission. <a:x_:789158785540948008>"
        }})
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send({embed: {
            color: 10038562,
            description: "No member specified <a:x_:789158785540948008>"
        }}) //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send({embed: {
            color: 10038562,
            description: "No role specified <a:x_:789158785540948008>"
        }}) //when no role is specified or pinged
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send({embed: {
            color: 3066993,
            description: `**<a:check:789158626459385917> <@${target.user.id}> has obtained a role**`
          }})
    }
}