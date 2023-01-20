const { Message } = require("discord.js");
const discord = require('discord.js')

module.exports = {
    name: "nuke",
    aliases: ['nk'],
    usage: null,
    description: "Nuke current channel",
    timeout: 10000,

    run: async (client, message, args) => {

      if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: {
        color: 10038562,
        description: "You do not have **MANAGE_CHANNELS** Permissions to Nuke Channel ❌"
      }}).then(m => m.delete({ timeout: 50000 }));
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: {
        color: 10038562,
        description: "Your role don't have **MANAGE_CHANNELS** Permissions to Nuke Current Channel ❌"
      }});

      let channel = client.channels.cache.get(message.channel.id)
      let pos = channel.position

      let msg = await message.channel.send({embed: {
        color: 15105570,
        description: `\`Are You sure you want to nuke this channel \` - ⁉ ` 
      }})
      await msg.react("✅")
      await msg.react("❌")

      const filter = (reaction, user ) => (reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && (user.id === message.author.id)
      
      msg.awaitReactions(filter, {max: 1}).then(collected => {

        if(collected.first().emoji.name === "✅") {
        
          channel.clone().then(async newChannel => {
            newChannel.setPosition(pos)
            channel.delete()
            newChannel.send({embed: {
              color: 15844367,
              description: `\` Channel Has Been Nuked \` - ☢ ` 
            }})
          })
        }
        if(collected.first().emoji.name === "❌") {
          message.channel.send({embed: {
            color: 15158332,
            description: `\` Nuke has been Cancelled \` - ❌ ` 
          }})
          msg.reactions.removeAll()
        }
      })
    }
  }
