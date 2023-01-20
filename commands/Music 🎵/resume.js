const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "resume",
    description: "Resume the paused Song",
    usage: null,
    aliases: ['res'],
    timeout: 5000,


  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("Music Has Been Resumed ▶")
      .setColor("#2f3136")
      .setTimestamp()
      .setAuthor("Success!")
      return message.channel.send(xd);
    }
    return message.reply({embed: {
      color: 15844367,
      description: `There is nothing playing in this server.`
  }});
  },
};
