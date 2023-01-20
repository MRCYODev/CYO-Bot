const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "oldest",
  aliases: null,
  usage: null,
  description: "Get the oldest account creation date in the guild!",
  timeout: 8000,
  
  run: async (client, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      .first();
    const Embed = new MessageEmbed()
      .setTitle(`The oldest member in ${message.guild.name}`)
      .setColor(`RANDOM`)
      .setFooter(`Date format: MM/DD/YYYY`)
      .addField(`${mem.user.tag} is the oldest user in`, `\u200b`)
      .addField(`${message.guild.name}!`, `\u200b`)
      .addField(`Account creation date: ${(mem.user.createdAt)}`, `\u200b`)
    message.channel.send(Embed);
  },
};