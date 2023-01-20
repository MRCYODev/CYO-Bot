const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const Zalgo = require('to-zalgo')

module.exports = {

        name: 'zalgo',
        description: 'Converts your text to Zalgo',
        aliases: null,
        usage: '<text>',
        timeout: 4000,

    run: async (client, message, args) => {
    
        const embed = new MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`${Zalgo(args.join(" "))}`)
     .setTimestamp()
    message.channel.send(embed)
    }
}