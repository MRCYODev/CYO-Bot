const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");


    module.exports = {
        name: 'addemoji',
        description: 'Adding emoji in current server from others',
        aliases: ['addem'],
        usage: '<emoji_name>',
        timeout: 10000,

            run: async (client, message, args) => {
                if (!message.member.hasPermission("MANAGE_EMOJIS")) {
                    return message.channel.send({embed: {
                        color: 10038562,
                        description: "You do not have **MANAGE_EMOJIS** Permissions to Add emoji <a:x_:789158785540948008>"
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
                    message.guild.emojis.create(
                        `${Link}`,
                        `${name || `${customemoji.name}`}`
                    ).catch(error => {
                        console.log(error)
                    })
                    const Added = new MessageEmbed()
                        .setTitle(`Emoji has been Added`)
                        .setColor(`RANDOM`)
                        .setDescription(
                            `**Emoji Added** | **Name:** \`${name || `${customemoji.name}`}\` | **Preview:** [Click Me](${Link})`
                        );
                    return message.channel.send(Added).catch(e => {
                        console.log(e)
                    })
                } else {
                    let CheckEmoji = parse(emoji, {
                        assetType: "png"
                    });
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
        };