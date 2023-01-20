const { MessageEmbed } = require("discord.js");

  module.exports = {
    name: "youngest",
    aliases: ['young'],
    usage: null,
    description: "Get the youngest account creation date in the guild!",
    timeout: 8000,

    run: async (client, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => b.user.createdAt - a.user.createdAt)
      .first();
    const Embed = new MessageEmbed()
      .setTitle(`The youngest member in ${message.guild.name}`)
      .setColor(`RANDOM`)
      .setDescription(`**<@${mem.user.id}>** is the youngest user in,
                        Account creation date: **${(mem.user.createdAt)}**,
                        **${message.guild.name}**!,
                        \u200B `)
      .setFooter(`Date format: Month/Day/Year`)
    message.channel.send(Embed);
  },
};