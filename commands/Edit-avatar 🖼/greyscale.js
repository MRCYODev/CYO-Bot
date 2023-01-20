const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");


module.exports = {
    name: 'greyscale',
    aliases: null,
    usage: null,
    description: 'Make Your avatar greyscale',
    timeout: 10000,

    run: async(client, message, args) => {

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const avatar = user.displayAvatarURL({
            dynamic: false,
            format: "jpg",
            size: 2048
        });
        const data = await Canvacord.Canvas.greyscale(avatar);
        return message.channel.send(new MessageAttachment(data, "greyscale.jpg"));
    }
}
    
