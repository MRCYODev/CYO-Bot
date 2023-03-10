const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "roll",
  aliases: ['rolldice'],
  usage: null,
  description: "Roll Dice mini game",
  timeout: 10000,

  run : async(client, message, args) => {

    let limit = args[0];
    if (!limit) limit = 6;
    const n = Math.floor(Math.random() * limit + 1);
    if (!n || limit <= 0)
      return this.sendErrorMessage(message, 0, 'Please provide a valid number of dice sides');
    const embed = new MessageEmbed()
      .setTitle('Dice  🎲')
      .setDescription(`${message.member}, you rolled a **${n}**!`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};