
const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "feed",
    aliases: null,
    usage: "(@user#1234)",
    description: "Say someone to feed it by tag",
    timeout: 10000,
  run: async (client, message, args) => {
  //command

        const user = message.mentions.users.first();
        if(!user)
        return message.reply({embed: {
            color: 10038562,
            description: `Mention someone to cuddle <a:x_:789158785540948008> `
          }});

        async function work() {
        let owo = (await neko.sfw.feed());

        const feedembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been fed! ")
        .setDescription((user.toString() + " got fed by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(feedembed);

}

      work();
}
                };