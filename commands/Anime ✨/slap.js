const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "slap",
    aliases: null,
    usage: "slap (@user#1234)",
    description: "Slap someone in current server",
    timeout: 10000,
  run: async (client, message, args) => {
  //command

        const user = message.mentions.users.first();
        if(!user)
        return message.reply({embed: {
            color: 10038562,
            description: `Mention someone to slap <a:x_:789158785540948008> `
          }});

        async function work() {
        let owo = (await neko.sfw.slap());

        const slapemebd = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been slapped ")
        .setDescription((user.toString() + " got slapped by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(slapemebd);

}

      work();
}
                };