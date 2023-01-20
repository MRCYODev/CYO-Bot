const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bot-top-guilds',
    aliases: ['btg'],
    usage: null,
    description: 'Show Top 25 Guilds In Bot',
    timeout: 8000,

    /** 
    *  
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
        run: async(client, message, args) => {
           
            const guilds = client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .first(25)

            const description = guilds
            .map((guild, index) => {
                return `${index + 1}) ${guild.name} -> ${guild.memberCount} Members!`;
            })
            .join("\n");

            message.channel.send(
                new MessageEmbed()
                .setTitle('25 Top Guilds')
                .setDescription(description)
                .setColor('#2f3136')
            )
    },
};
