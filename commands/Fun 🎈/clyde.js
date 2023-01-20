const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'clyde',
    aliases: null,
    usage: '(text)',
    description: 'Make clyde say something!',
    timeout: 4000,

    run: async(client, message, args) => {

        const msg = args.join(" ") || "Provide text!";

        const data = await Canvacord.Canvas.clyde(msg);
        return message.channel.send(new MessageAttachment(data, "clyde.png"));
    }
}
    
