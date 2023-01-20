module.exports = {
    name: "mcbody",
    aliases: null,
    usage: '[user]',
    description: "Show Minecraft Bodys",
    timeout: 6000,

    run: async (client, message, args) => {
        let user = args.join(" ")
        if(!user) return message.channel.send({embed: {
            color: 2067276,
            description: `<a:Minecraft:805752901631868958> **|** Specify a user`
          }})

        const discord = require('discord.js')
        const body = `https://mc-heads.net/body/${user}`

        const embed = new discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`Body of ${user}`)
        .setTimestamp()
        .setFooter('Based on mc-heads.net')
        .setImage(body)
        message.channel.send(embed)
    }
}
