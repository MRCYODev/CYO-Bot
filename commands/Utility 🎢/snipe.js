const Discord = require('discord.js');

module.exports = {
    name: "snipe",
    aliases: null,
    usage: null,
    desciption: "Bot snipe deleted message",
    timeout: 6000,

    run: async (client, message, args) => {
        const msg = client.snipes.get(message.channel.id)
        if(!msg) {
            return message.channel.send({embed: {
                color: 10038562,
                description:  "There are no deleted messages! <a:x_:789158785540948008> "
              }})
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Deleted by ${msg.author}`, message.author.displayAvatarURL())
        .setDescription(msg.content)
        .setColor("YELLOW")
        .setTimestamp()
        if(msg.image)embed.setImage(msg.image)

        message.channel.send(embed)
    }
}