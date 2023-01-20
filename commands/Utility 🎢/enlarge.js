const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
    name: "enlarge",
    aliases: null,
    usage: "(emoji)",
    description: "Enlarge Discord emojis",
    timeout: 6000,

    run: async (client, message, args) => {
    const emoji = args[0];
    if (!emoji) return message.channel.send({embed: {
        color: 10038562,
        description: `No emoji provided! <a:x_:789158785540948008> `
      }});

    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
    .setTitle(`Enlarged version of ${emoji}`)
    .setColor("#FFFF00");

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send(embed);
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.channel.send({embed: {
            color: 10038562,
            description: `Invalid emoji! <a:x_:789158785540948008> `
          }});

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
    }

}
}