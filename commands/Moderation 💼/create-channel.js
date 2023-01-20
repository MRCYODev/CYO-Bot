const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'create-channel',
    aliases: ['cre-chl'],
    usage: '[name]',
    description: 'Create a channel in current server',
    timeout: 10000,
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **MANAGE_CHANNELS** permission. <a:x_:789158785540948008>"
        }})

        const channelNameQuery = args.join(" ");
        if (!channelNameQuery) return message.reply({embed: {
            color: 15158332,
            description: `Please specify a channel name! <a:x_:789158785540948008>`
          }});


        message.guild.channels.create(channelNameQuery).then((ch) => {
            message.channel.send({embed: {
                color: 15105570,
                description: `🎪 __New Channel Has Been Created__ \n Click **${ch}** to access new **Channel!**`
              }});
        });
    },
};