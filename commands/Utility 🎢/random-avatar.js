const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'random-avatar',
    aliases: ['rand-ava'],
    usage: null,
    description: 'Bot Generates random avatar from user in current server',
    timeout: 6000,

    /** 
    *  
    * @param {client} client
    * @param {message} message
    */
        run: async(client, message) => {
            const user = client.users.cache.random();

            message.channel.send(
                new MessageEmbed()
                .setColor('RED')
                .setDescription(`**${user.username}** Avatar! **[PNG](${user.displayAvatarURL({ format: 'png', size: 4096 })})**`)
                .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            )
        }

}
