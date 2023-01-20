const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "skip-to",
    description: "Skip to the selected queue number",
    usage: "<number>",
    aliases: ['st', 'sk-to'],
    timeout: 10000,

  run: async (client, message, args) => {
    if (!args.length || isNaN(args[0]))
      return message.channel.send({
                        embed: {
                            color: "#2f3136",
                            description: `Usage: **[prefix]**skip-to __<number>__`
                        }
   
                   }).catch(console.error);
        

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply({embed: {
      color: 15158332,
      description: `There is no queue` 
  }}).catch(console.error);
    if (args[0] > queue.songs.length)
      return message.reply({embed: {
        color: 15105570,
        description: `The queue is only **${queue.songs.length}** Song/s long!` 
    }}).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
       return message.reply({embed: {
        color: 15844367,
        description: `The player has stopped and the queue has been cleared. ${error} ${message.channel}`
    }});
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "#2f3136",
                            description: `${message.author} ⏭ Skipped \`${args[0] - 1}\` Songs`
                        }
   
                   }).catch(console.error);
  },
};
