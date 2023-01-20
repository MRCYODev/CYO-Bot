const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "remove",
    description: "Remove song from the queue",
    usage: "rm <number>",
    aliases: ["rm"],
    timeout: 5000,

  run: async (client, message, args) => {
   const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is no queue.",message.channel).catch(console.error);
    if (!args.length) return message.reply(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);
    if (isNaN(args[0])) return message.reply(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);
    if (queue.songs.length == 1) return message.reply("There is no queue.",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return message.reply(`The queue is only ${queue.songs.length} songs long!`,message.channel).catch(console.error);
try{
    const song = queue.songs.splice(args[0] - 1, 1); 
    message.reply(`❌ **|** Removed: **\`${song[0].title}\`** from the queue.`,queue.textChannel).catch(console.error);
                   message.react("✅")
} catch (error) {
        return message.reply(`:notes: An unexpected error occurred.\nPossible type: ${error}`, message.channel);
      }
  },
};
