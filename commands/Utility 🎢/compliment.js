const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "compliment",
  description: "Get a compliment",
  aliases:["comp"],
  usage: null,
  timeout: 6000,

run: async (client, message) => {
    const { compliment } = await fetch(
      "https://complimentr.com/api"
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setTitle("Compliment")
      .setDescription(compliment)
      .setColor("RANDOM")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send(embed);
  },
};