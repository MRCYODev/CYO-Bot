const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "pause",
    description: "To pause the current music in the server",
    usage: "",
    aliases: ['pas'],
    timeout: 10000,


  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return  message.channel.send(`ERROR`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription(`Music Has Been Paused ⏸ \n\n Paused by: \n `)
      .setColor("#2f3136")
      .setTitle(`Success!`)
      .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      return message.channel.send(xd);
    }
    return message.channel.send("There is nothing playing in this server.");
  },
};
