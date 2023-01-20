const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "set-nick",
  usage: "(user#1234) [new name]",
  aliases: null,
  description: "Sets Member Username in Current server",
  timeout: 10000,
  
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply({embed: {
        color: 15158332,
        description: `Please Provide an Member <a:x_:789158785540948008>`
      }});

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply({embed: {
        color: 15158332,
        description: `Please Provide an Nickname <a:x_:789158785540948008>`
      }});

    try {
      member.setNickname(arguments);
    } catch (err) {
      console.log(err);
      message.reply(
        "I do not have permission to set " + member.toString() + " nickname!"
      );
    }
  },
};
