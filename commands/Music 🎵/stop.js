const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "stop",
    description: "Stop the music and clearing the queue",
    usage: "",
    aliases: [],
    timeout: 5000,

  run: async (client, message, args) => {
    const channel = message.member.voice.channel
    if (!channel)return message.reply({embed: {
      color: 1752220,
      description: `"I'm sorry but you need to be in a __**Voice Channel**__ to play music! ${message.channel}`
  }});
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.reply({embed: {
      color: 10181046,
      description: `There is nothing playing that I could stop for you. ${message.channel}`
  }});
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return message.reply({embed: {
          color: 15844367,
          description: `The player has stopped and the queue has been cleared. ${error} ${message.channel}`
      }});
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    let embed = new MessageEmbed()
    .setDescription('Music **stopped** into this server')
    .setTitle('Success! 👍')
    .setColor("#2f3136")
    .setTimestamp()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)
    message.react("⛔")
  },
};