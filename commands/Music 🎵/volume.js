const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "volume",
    description: "Change the song volume",
    usage: "[number] 0% - 200%",
    aliases: ["v", "vol"],
    timeout: 3000,


  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel)return message.reply({embed: {
      color: 15158332,
      description: `<a:x_:789158785540948008> I'm sorry but you need to be in a __**Voice Channel**__ to play music! `
  }});
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply({embed: {
      color: 15158332,
      description: `<a:x_:789158785540948008> There is nothing playing in current **Server!** `
  }});
    if (!serverQueue.connection) return message.reply({embed: {
      color: 15158332,
      description: `<a:x_:789158785540948008> There is nothing playing in current **Server!** `
  }});
    if (!args[0])return message.channel.send({embed: {
      color: 3447003,
      description: `<:volume:812376299145789491> The current Volume is: **${serverQueue.volume}**`
  }});
     if(isNaN(args[0])) return message.channel.send({embed: {
      color: 15844367,
      description: '🔢 **Numbers** only!'
  }}).catch(err => console.log(err));
    if(parseInt(args[0]) > 200 ||(args[0]) < 0) return message.reply({embed: {
      color: 15158332,
      description: `<a:x_:789158785540948008> You can\'t set the volume more than 200. or lower than 0 `
  }}).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Volume Has Been Seted to: **${args[0]/1}/200**`)
    .setAuthor("Bot'\s Volume", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("#2f3136")
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    return message.channel.send(xd);
  },
};
