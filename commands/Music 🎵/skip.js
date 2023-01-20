const { Util, MessageEmbed } = require("discord.js");

module.exports = {

    name: "skip",
    description: "To skip the current song",
    usage: "",
    aliases: ["sk"],
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
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("Music Has Been Resumed!")
      .setColor("#2f3136")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return message.reply({embed: {
          color: 15844367,
          description: `The player has stopped and the queue has been cleared. ${error} ${message.channel}`
      }});
      }
  },
};
