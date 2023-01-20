const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "anti-raid",
    aliases: null,
    usage: 'on or off',
    description: "Anti-Raid Command Locking All Channels",
    timeout: 10000,

    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **ADMINISTRATOR** permission. <a:x_:789158785540948008>"
        }})
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send({embed: {
                color: 3066993,
                description: '<a:check:789158626459385917> Successfully locked all channels'
              }});
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: null,
                    ADD_REACTIONS: null
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send({embed: {
                color: 3066993,
                description: '<a:check:789158626459385917> Successfully Unlocked all channels'
              }})
        }
    }
}
