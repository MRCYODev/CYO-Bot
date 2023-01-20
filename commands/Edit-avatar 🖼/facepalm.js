const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");


module.exports = {
    name: 'facepalm',
    aliases: null,
    usage: null,
    description: 'Make Your avatar Facepalm',
    timeout: 10000,

    run: async(client, message, args) => {

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const avatar = user.displayAvatarURL({
            dynamic: false,
            format: "jpg",
            size: 2048
        });
        const data = await Canvacord.Canvas.facepalm(avatar);
        return message.channel.send(new MessageAttachment(data, "facepalm.jpg"));
    }
}
    
