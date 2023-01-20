const Discord = require("discord.js");

module.exports = {
  name: "poll",
  aliases: null,
  usage: '(channel) [text]',
  description: "Create a simple yes or no poll",
  timeout: 6000,
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({embed: {
        color: 10038562,
        description:  `You do not have **ADMINISTRATOR** ${message.author.username} for create an poll <a:x_:789158785540948008> `
      }});
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) {
      return message.channel.send({embed: {
        color: 10038562,
        description:  `You did not mention/-/give the id of your channel! <a:x_:789158785540948008> `
      }});
    }
    let question = message.content
      .split(`${client.prefix}poll ${channel} `)
      .join("");
    if (!question)
      return message.channel.send({embed: {
        color: 10038562,
        description:  `You did not specify your question! <a:x_:789158785540948008> `
      }});
    const Embed = new Discord.MessageEmbed()
      .setTitle(`__**New Poll**__`)
      .setDescription(`${question}`)
      .setFooter(`${message.author.username} has created this poll.`)
      .setColor("GREEN");
    let msg = await client.channels.cache.get(channel.id).send(Embed);
    await msg.react("👍");
    await msg.react("👎");
  },
};
