const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "poke",
    aliases: null,
    usage: "(@user#1234)",
    description: "Poke someone",
    timeout: 10000,
  run: async (client, message, args) => {
  //command

        const user = message.mentions.users.first();
        if(!user)
        return message.reply({embed: {
            color: 10038562,
            description: `Mention someone to poke <a:x_:789158785540948008> `
          }});

        async function work() {
        let owo = (await neko.sfw.poke());

        const pokeembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been poked ")
        .setDescription((user.toString() + " got poked by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(pokeembed);

}

      work();
}
                };