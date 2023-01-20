  
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "servericon",
    aliases: ['sicon', 'sicn', 'si'],
    usage: null,
    description: "Show icon from current server",
    timeout: 8000,

    run: async (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name}'s Icon`)
    .setImage(message.guild.iconURL({ dynamic: true, size: 4096 }))
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
  message.channel.send(embed);
}
};