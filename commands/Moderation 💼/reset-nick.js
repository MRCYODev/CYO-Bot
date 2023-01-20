const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset-nick",
  usage: "(user#1234)",
  aliases: ['resnick'],
  description: "Resets member name in current server",
  timeout: 10000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send({embed: {
        color: 10038562,
        description: "You do not have **MANAGE_NICKNAMES** Permissions <a:x_:789158785540948008> "
      }});
    const member = message.mentions.members.first();

    if (!member) return message.reply({embed: {
        color: 15158332,
        description: `Please Provide an Member <a:x_:789158785540948008>`
      }});

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply({embed: {
        color: 15158332,
        description: "I do not have permission to reset " + member.toString() + " nickname!"
      }});
    }
  },
};
