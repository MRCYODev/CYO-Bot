const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "nekoapiclassic",
  usage: null,
  aliases: null,
  description: "Sends a random image from the neko.life api nsfw classic endpoint",
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
        let owo = (await neko.nsfw.classic());

        const nekoapiclassic = new Discord.MessageEmbed()
        .setTitle("Neko.Life API Classic Endpoint")
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(nekoapiclassic);

}

      work();
}
                };