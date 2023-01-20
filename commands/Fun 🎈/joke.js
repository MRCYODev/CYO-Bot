const Discord = require('discord.js')
const jokes = require('discord-jokes')

module.exports = {
    name: "joke",
    aliases: null,
    usage: null,
    description: "Bot say some random jokes",
    timeout: 4000,

    run: async (client, message, args) => {
    jokes.getRandomDadJoke(function (joke) {
    
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(joke)
            .setTimestamp()
        message.channel.send(embed);
    })
}
}