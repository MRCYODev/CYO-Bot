const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delete-channel',
    aliases: ['del-chl'],
    usage: '[channel]',
    description: 'Delete a channel in current server',
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

        
        let channelTarget = message.mentions.channels.first();
        if (!channelTarget) return message.channel.send("Please Mention Channel")

        channelTarget.delete().then((ch) => {
            message.author.send({embed: {
                color: 10038562,
                description: `Channel Has Been **Deleted!** <a:check:789158626459385917> `
            }});
        });
    },
};