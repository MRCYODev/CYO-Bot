const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name : 'set-prefix',
    aliases: null,
    usage: null,
    description: 'sets bot prefix in current server',
    timeout: 30000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **ADMINISTRATOR** permission. <a:x_:789158785540948008>"
        }})
        
        const res = await args.join(" ")
        if(!res) return message.channel.send({embed: {
                color: 10181046,
                description: `**Please specify a prefix to change to**`,
            }})
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send({embed: {
                        color: 10181046,
                        description: `Your prefix has been updated to **${res}**`,
                    }})
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Custom prefix in this server is now set to **${res}**`)
            }
        })
    }
}
