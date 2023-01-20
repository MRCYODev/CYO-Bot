const { MessageEmbed } = require("discord.js");
const { getAnnounceChannel } = require("../../utils/functions");

module.exports = {
  name: "announcement",
  description: "announcement something in a channel",
  usage: "(channel) (text)",
  aliases: ['announce'],
  timeout: 10000,

  run:async (client, message, args) => {
    message.delete();
    if (!args[0]) {
      return message.channel.send(
        "Please provide text or a valid channel!\n You can also set a default channel using `set announce-channel <channel mention>`"
      );
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        {embed: {
            color: 10038562,
            description: "You do not have **MANAGE_MESSAGES** Permissions ❌"
          }});

    const announceChannel = await getAnnounceChannel(message.guild.id);
    let channel = message.mentions.channels.first();
    let text;

    if (channel) {
      text = args.splice(1).join(" ");
    } else if (announceChannel !== null) {
      channel = announceChannel;
      text = args.join(" ");
    } else {
      return message.channel.send("Please provide text or a valid channel");
    }

    const embed = new MessageEmbed()
    
      .setTitle("Announcement 📢")
      .setDescription(text)
      .setFooter(message.author.username)
      .setTimestamp()
      .setColor('RANDOM');    
    
    client.channels.cache.get(channel.id).send(embed);
  },
};