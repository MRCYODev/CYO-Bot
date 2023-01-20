  
const { Client, Message } = require("discord.js");

module.exports = {
  name: "join-position",
  aliases: ['ji-pos', 'mem-posit'],
  description: 'Shows a Member position in current server',
  usage: '[@user#1234]',
  timeout: 8000,
  /**
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply({embed: {
        color: 10038562,
        description: "Please specify a member! ❌"
      }});

    const members = message.guild.members.cache
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();

    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        if (members[i - 1].id === member.id) ful(i);
      }
    });

    message.channel.send({embed: {
        color: 10181046,
        description: `${member} is the ${await position} member to join the server! 👋`
      }});
  },
};
