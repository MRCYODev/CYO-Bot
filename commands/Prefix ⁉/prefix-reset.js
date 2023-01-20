const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix
const { confirmation } = require('@reconlx/discord.js')

module.exports = {
    name : 'prefix-reset',
    aliases: null,
    usage: null,
    description: 'reset prefix to basic prefix',
    timeout: 30000,
    run : async(client, message) => {
         if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **ADMINISTRATOR** permission. <a:x_:789158785540948008>"
        }})
        message.channel.send("Are you sure you want to reset the prefix?").then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
            if(emoji === '✅') {
                msg.delete()
                await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                message.channel.send(`The prefix has been reset to ${prefix}`)
            }
            if(emoji === '❌') {
                msg.delete()
                message.channel.send('reset prefix has been cancelled.')
            }
        })

    }
}
