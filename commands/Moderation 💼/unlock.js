
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "unlock",
    description: "Unlock Current Channel",
    usage: null,
    aliases: null,
    timeout: 10000,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.reply('<:Xmark:795173588537311252> | You must have "ADMINISTRATOR" permissions in order to use this!');
        } else {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null, ADD_REACTIONS: null });
            const unlocked = new MessageEmbed()
            .setColor('#00ff12')
            .setTitle('Unlock channel success')
            .setDescription('🔓 | Okay, unlocked channel to ``false``')
            .setTimestamp()
            message.channel.send(unlocked)
  message.channel.updateOverwrite (message.channel.guild.roles.everyone).delete();  
        }
      }
  }
