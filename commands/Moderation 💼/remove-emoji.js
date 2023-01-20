const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

    module.exports = {
        name: 'remove-emoji',
        description: 'Deletes an emoji from current server',
        aliases: ['remem'],
        usage: '<emoji>',
        timeout: 10000,

            run: async (client, message, args) => {
                if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
                    return message.channel.send({embed: {
                        color: 10038562,
                        description: "You do not have **MANAGE_EMOJIS** Permissions to Remove emoji <a:x_:789158785540948008>"
                    }})
                }
                
                const emoji = args[0];
                if (!emoji) return message.channel.send({embed: {
                    color: 10038562,
                    description: "Please Give Me A Emoji! <a:x_:789158785540948008> "
                }});
            
                let customemoji = Discord.Util.parseEmoji(emoji);
            
                if (customemoji.id) {
                    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
                    customemoji.animated ? "gif" : "png"
                    }`;
                    const name = args.slice(1).join(" ");
                    message.guild.emojis.resolve(customemoji.id).delete();
            
                    const Added = new MessageEmbed()
                    .setTitle(`Emoji Has Been Deleted <a:check:789158626459385917>`)
                    .setColor(`RANDOM}`)
                    return message.channel.send(Added);
                } else {
                    let CheckEmoji = parse(emoji, { assetType: "png" });
                    if (!CheckEmoji[0])
                    return message.channel.send({embed: {
                        color: 10038562,
                        description: "Please Give Me A Valid Emoji! <a:x_:789158785540948008> "
                    }});
                    message.channel.send(
                    `You Can Use Normal Emoji Without Adding In Server!`
                    );
                }
            }
        }