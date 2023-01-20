const { MessageEmbed } = require("discord.js");


module.exports = {

    name: "shuffle",
    description: "Shuffle queue",
    usage: "[shuffle]",
    aliases: ["shuffle"],
    timeout: 3000,

  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply({embed: {
      color: 15158332,
      description: `There is no queue` 
  }}).catch(console.error);
try{
    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);

    let shuffleembed = new MessageEmbed()
    .setDescription('Shuflle Has Been Enabled')
    .setTitle('Success! ✅')
    .setColor("#2f3136")
    .setTimestamp()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(shuffleembed)

    message.react("🔀")
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return message.reply({embed: {
          color: 15844367,
          description: `The player has stopped and the queue has been cleared. ${error} ${message.channel}`
      }});
     }
  },
};
