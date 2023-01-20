const { MessageEmbed } = require("discord.js");


module.exports = {

    name: "join",
    description: "join in current voice channel",
    usage: null,
    aliases: ['j-vc'],
    timeout: 3000,

  run: async (client, message, args) => {
const Channel = message.member.voice.channel;
if (!Channel) return message.channel.send({embed: {
    color: 10038562,
    description: `<@${message.author.id}> Your are not in an Voice Channel <a:x_:789158785540948008>`
}});
if (Channel.full) return message.channel.send({embed: {
    color: 10038562,
    description: `<@${message.author.id}> Channel Is Full! <a:x_:789158785540948008>`
}});
if (!Channel.joinable || !Channel.speakable) return message.channel.send({embed: {
    color: 10038562,
    description: `<@${message.author.id}> Not **joinable** or **speakable** <a:x_:789158785540948008>`
}});
if (message.guild.me.voice.channel) return message.channel.send({embed: {
    color: 10038562,
    description: `<@${message.author.id}> Already Connected To ${message.guild.me.voice.channel.id == Channel.id ? "Your" : "A"} Voice Channel! <a:x_:789158785540948008>`
}});

try {
    await Channel.join().then((Connection) => {
        Connection.voice.setSelfDeaf(true);
    let embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true}))
        .setColor('#2f3136')
        .setDescription(`Bot Has Been Joined at Voice Channel`)
        .setFooter(`Success! ✅`)
        .setTimestamp()

    return message.channel.send(embed)
    });
} catch (e) {
    return message.channel.send("**Error** Unknown").then(() => console.log(e));
}
  }
}