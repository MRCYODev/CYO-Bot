const { MessageEmbed } = require("discord.js");

    module.exports = {
        name: "serveremojis",
        aliases: ['sem', 'emoji'],
        usage: null,
        description: "View all emojis in the current server (If you have over 50 will be not showing)",
        timeout: 6000,

            run: async (client, message, args) => {
                
                const emotes = message.guild.emoijs.cache;
                const emo = emotes.length > 50 ? emotes.slice(0, 50) : emotes
                let Emojis = "";
                let EmojisAnimated = "";
                let EmojiCount = 0;
                let Animated = 0;
                let OverallEmojis = 0;
                function Emoji(id) {
                return client.emojis.cache.get(id).toString();
                }
                message.guild.emojis.cache.forEach((emoji) => {
                OverallEmojis++;
                if (emoji.animated) {
                    Animated++;
                    EmojisAnimated += Emoji(emoji.id);
                } else {
                    EmojiCount++;
                    Emojis += Emoji(emoji.id);
                }
                });
                let Embed = new MessageEmbed()
                .setTitle(`Emojis in ${message.guild.name}.`)
                .setDescription(
                    `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
                )
                .setColor(`RANDOM`);
                message.channel.send(Embed);
            },
            };
