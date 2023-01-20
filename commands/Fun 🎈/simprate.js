const Discord = require("discord.js")

module.exports = {
    name: "simprate",
    aliases: ['simp'],
    usage: "(@user#1234/ID)",
    description: "Bot Rate how much simp are",
    timeout: 4000,

    run: async (client, message, args) =>{
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
             || message.member; let gayrate = Math.floor(Math.random() * 101)


        if(!User){
            let gayrateEmbed = new Discord.MessageEmbed()
                .setTitle("Simprate Machine")
                .setColor("RANDOM")
                .setDescription("You are `" + gayrate + "%` a simp! <:PeepoSimp:789158433336459286>")
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(gayrateEmbed).catch(e => {
                console.log(e)
            })
        } else {
            let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Simprate Machine")
                .setColor("RANDOM")
                .setDescription(`${User.user.username} is \`${gayrate}%\` a simp! <:PeepoSimp:789158433336459286>`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(argsEmbed).catch(e => {
                console.log(e)
            })
        }
    }
}