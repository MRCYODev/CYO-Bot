const canva = require('canvacord');
const Discord = require('discord.js');
const { changemymind } = require('canvacord');

module.exports = {
    name: "cmm",
    aliases: ['changemymind'],
    usage: "(text)",
    description: "changemymind meme command",
    timeout: 4000,


    run: async (client, message, args) => {

        let text = args.join(" ");

        if(!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description: `Write what do <a:x_:789158785540948008> `
          }});

        let image = await canva.Canvas.changemymind(text);

        let changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

        message.channel.send(changeMyMind);
    }
}