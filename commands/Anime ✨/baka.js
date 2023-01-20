const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "baka",
    aliases: null,
    usage: "(@user#1234)",
    description: "Say someone idiot in current server by tag",
    timeout: 10000,
  run: async (client, message, args) => {
  //command

        const user = message.mentions.users.first();
        if(!user)
        return message.reply({embed: {
            color: 10038562,
            description: `Mention someone call an idiot <a:x_:789158785540948008> `
          }});

        async function work() {
        let owo = (await neko.sfw.baka());

        const baka = new Discord.MessageEmbed()
        .setTitle(" IDIOT! ")
        .setDescription((" BAKA!!! " + user.toString()))
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(baka);

}

      work();
}
};
