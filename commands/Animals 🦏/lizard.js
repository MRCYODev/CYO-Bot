const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "lizard",
    aliases: null,
    usage: null,
    description: "Random Picture of lizard",
    timeout: 5000,

    run: async (client, message, args) => {
  //command

        async function work() {
        let owo = (await neko.sfw.lizard());

        const lizard = new Discord.MessageEmbed()
        .setTitle("Random Lizard Image")
        .setImage(owo.url)
        .setColor(`#000000`)
        .setURL(owo.url);
        message.channel.send(lizard);

}

      work();
}
                };