const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: "dog",
    aliases: null,
    usage: null,
    description: "Random Picture of dog",
    timeout: 5000,

    run: async (client, message, args) => {
try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const img = (await res.json()).message;
    const embed = new MessageEmbed()
      .setTitle('Dog Woof woof...  🐶')
      .setImage(img)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  } catch (err) {
    message.client.logger.error(err.stack);
    this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
  }
}
};