const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "pat",
    aliases: null,
    usage: "(@user#1234)",
    description: "pat someone by tag in current server",
    timeout: 10000,
  run: async (client, message, args) => {
  //command

        const user = message.mentions.users.first();
        if(!user)
        return message.reply({embed: {
            color: 10038562,
            description: `Mention someone to pat <a:x_:789158785540948008> `
          }});

        async function work() {
        let owo = (await neko.sfw.pat());

        const patembed = new Discord.MessageEmbed()
        .setTitle(user.username + " !!! ")
        .setDescription((user.toString() + " got patted by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(patembed);

}

      work();
}
                };