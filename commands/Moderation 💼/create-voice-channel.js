const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: "create-voice-channel",
    usage: '(channel-name)',
    description: "Create Voice Channels in your Server",
    aliases: null,
    timeout: 10000,

    run: async(client, message , args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.channel.send({embed: {
        color: 10038562,
        description: "You do not have **MANAGE_CHANNELS** Permissions <a:x_:789158785540948008>"
    }})
}
    if (!args[0]) {
    return message.channel.send({embed: {
        color: 10038562,
        description: "Please Provide an voice channel name <a:x_:789158785540948008>"
    }})
}
    message.guild.channels.create(args.slice(0).join(" "), {type: "voice"});

    const embed = new Discord.MessageEmbed()
    .setTitle("Channel Has Been Created")
    .setTimestamp()
    .setDescription(`Channel Created by \n > **${message.author.username}**`)
    .setColor("RANDOM");
   
  message.channel.send(embed);
}
}