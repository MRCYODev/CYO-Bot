
const { MessageEmbed, version } = require('discord.js');
const { stripIndent } = require('common-tags');
const moment = require('moment'); require("moment-duration-format");

module.exports = {
    name: "servercount",
    aliases: ['scount', 'sc'],
    usage: null,
    description: "Shows server count",
    timeout: 8000,

    run: async (client, message, args) => {

    const counts = stripIndent`
    Servers    :: ${message.client.guilds.cache.size}
    Channels   :: ${message.client.channels.cache.size}
    Users      :: ${message.client.users.cache.size}
    Usage      :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    Discord.js :: v${version}
    Node       :: ${process.version}
  `;
  const embed = new MessageEmbed()
    .setTitle('CYO\'s Server Count')
    .setDescription(stripIndent`\`\`\`asciidoc\n${counts}\`\`\``)
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
  message.channel.send(embed);
}
}