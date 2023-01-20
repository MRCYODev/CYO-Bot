const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "imgfy",
    aliases: ['texttoimage', 'conv-img'],
    usage:"<text>",
    description: "Converts Your text to image",
    timeout: 4000,

   run: async (client, message, args) => {
      const text = args.join(" ");
  
      if (!text) {
        return message.channel.send("Please write some text");
      }
  
      const image = `https://flamingtext.com/net-fu/proxy_form.cgi?script=3d-logo&text=${encodeURIComponent(
        text
      )}&_loc=generate&imageoutput=true`;
  
      const embed = new MessageEmbed()
        .setDescription(`[Click here if the image failed to load.](${image})`)
        .setColor("RANDOM")
        .setImage(image);
  
      message.channel.send(embed);
    },
  };