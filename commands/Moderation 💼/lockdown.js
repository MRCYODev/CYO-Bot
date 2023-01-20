const {MessageEmbed} = require("discord.js") 
module.exports = {
    name: "lockdown",
    aliases: null,
    usage: null,
    description: "Lock Current Channel",
    timeout: 10000,

    run: async (client, message, args) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.reply('❌ | You must have "`ADMINISTRATOR`" permissions in order to use this!');
        } else {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false });
            const locked = new MessageEmbed()
            .setColor('#00ff12')
            .setTitle('✅ | Lock channel success')
            .setDescription('🔒 | Okay, locked  down to ``true``')
            .setTimestamp()
            message.channel.send(locked)
        }
    }
}
