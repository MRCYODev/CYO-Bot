const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'temp-mute',
    usage: '(@user#1234) or (ID) 1h',
    description: 'temp mute an member in current server',
    aliases: null,
    timeout: 10000,
    

    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **MANAGE_MESSAGES** Permissions to temp-mute someone <a:x_:789158785540948008> "
          }})
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send({embed: {
            color: 10038562,
            description: "Please Provide member to temp-mute <a:x_:789158785540948008> "
          }})
        if(!time) return message.channel.send({embed: {
            color: 10038562,
            description: "Please specify a time. <a:x_:789158785540948008> "
          }})
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send({embed: {
                    color: 3447003,
                    description: "Muted role is not found <a:x_:789158785540948008>, attempting to create muted role. <a:loading:789495382345383966> "
                  }})

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send({embed: {
                    color: 3066993,
                    description: "Muted role has sucessfully been created. <a:check:789158626459385917>"
                  }})
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send({embed: {
            color: 15844367,
            description: `**${Member.displayName}** has already been muted. <a:x_:789158785540948008>`
          }})
        await Member.roles.add(role2)
        message.channel.send({embed: {
            color: 3066993,
            description: `Succsess **${Member.displayName}** is now Muted. <a:check:789158626459385917>`
          }})

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send({embed: {
                color: 3066993,
                description: `Succsess **${Member.displayName}** is now Unmuted. <a:check:789158626459385917>`
              }})
        }, ms(time))
    }
}
