const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "channel-topic",
  description: "Update the channel topic",
  aliases: ['ctopic', 'chtop'],
  usage: "(#channel_name) [topic]",
  timeout: 10000,

  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        errorEmbed("manage channels! (Manage Channels)", message)
      );

    let channel = message.mentions.channels.first();
    let topic;
    if (!channel) {
      channel = message.channel;
      topic = args.join(" ");
    } else {
      topic = args.slice(1).join(" ").trim();
    }

    if (!topic) return message.reply({embed: {
        color: 10038562,
        description: "Please provide a new topic <a:x_:789158785540948008>"
    }});

    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        {embed: {
            color: 10038562,
            description: "You do not have **MANAGE_CHANNELS** permission. <a:x_:789158785540948008>"
        }});

    await channel.setTopic(topic);
    await message.channel.send({embed: {
        color: 10038562,
        description: `Successfully updated channel topic to **${topic}** <a:check:789158626459385917> `
    }}
      
    );
  },
};