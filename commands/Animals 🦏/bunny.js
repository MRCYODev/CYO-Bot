const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "bunny",
    aliases: null,
    usage: null,
    description: "Random Picture of Bunny",
    timeout: 5000,
    
 run: async (client, message) => {
    const data = await fetch(
        "https://api.bunnies.io/v2/loop/random/?media=gif,png"
      ).then((res) => res.json());
  
      const embed = new MessageEmbed()
        .setFooter(message.author.username)
        .setColor("RANDOM")
        .setDescription(
          `Bunny 🐰`
        )
        .setImage(`${data.media.gif}`)
        .setTimestamp();
  
      message.channel.send(embed);
    },
  };