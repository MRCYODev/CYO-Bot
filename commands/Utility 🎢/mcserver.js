const util = require('minecraft-server-util')
const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "mcserver",
    aliases: ['mserver', 'minecraftserver', 'mcstats'],
    usage: '(mc.hypixel.net)',
    description: "search minecraft server stats",
    timeout: 6000,

    run: async (client, message, args) => {
        const ip = args.join(" ")
        if(!ip) return message.channel.send({embed: {
            color: 10038562,
            description:  "Please Provide an ip address <a:x_:789158785540948008> "
          }})
        util.status(ip).then(res => {
            let embed = new MessageEmbed()
            .setAuthor('Minecraft Server Stats 📊')
            .setTitle(ip)
            .setThumbnail('https://images-ext-2.discordapp.net/external/po6YNX_EOA5tpAfc2jnc7DN8ZCpHHhobkJAnnEzlfoU/https/play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP')
            .setColor("GREEN")
            .addFields(
                { name: 'Server Version', value: res.version, inline: true },
                { name: 'Server Ip', value: res.host, inline: true },
                { name: 'Port', value: res.port, inline: true },
                { name: 'Online Players', value: res.onlinePlayers, inline: true },
                { name: 'Max Players', value: res.maxPlayers, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
            )
            .setTimestamp()
            return message.channel.send(embed)
        })
    }
}