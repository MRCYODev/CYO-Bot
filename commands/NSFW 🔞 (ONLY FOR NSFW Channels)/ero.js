const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "ero",
  usage: null,
  aliases: null,
  description: null,
  run: async (client, message, args) => {
  //command

  //Checks channel for nsfw
  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.ero());

        const ero = new Discord.MessageEmbed()
        .setTitle("Erotic")
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(ero);

}

      work();
}
                };