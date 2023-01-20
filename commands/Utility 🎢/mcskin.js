module.exports = {
    name: "mcskin",
    aliases: null,
    usage: '[user]',
    description: "Shows Minecraft Skins",
    timeout: 6000,

    run: async (client, message, args) => {
        let user = args.join(" ")
        if(!user) return message.channel.send({embed: {
            color: 2067276,
            description: `<a:Minecraft:805752901631868958> **|** Specify a user`
          }})

        const discord = require('discord.js')
        const skin = `https://mc-heads.net/skin/${user}`

        const embed = new discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`Skin of ${user}`)
        .setTimestamp()
        .setFooter('Based on mc-heads.net')
        .setImage(skin)
        message.channel.send(embed)
    }
}
