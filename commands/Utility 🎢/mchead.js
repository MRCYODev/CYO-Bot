module.exports = {
    name: "mchead",
    aliases: null,
    usage: '[user]',
    description: "Shows Minecraft Head skins",
    timeout: 6000,

    run: async (client, message, args) => {
        let user = args.join(" ")
        if(!user) return message.channel.send({embed: {
            color: 2067276,
            description: `<a:Minecraft:805752901631868958> **|** Specify a user`
          }})

        const discord = require('discord.js')
        const head = `https://mc-heads.net/head/${user}`

        const embed = new discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`Head of ${user}`)
        .setTimestamp()
        .setFooter('Based on mc-heads.net')
        .setImage(head)
        message.channel.send(embed)
    }
}
