let nhentai = require('nhentai');
let api = new nhentai.API();
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'nhentai',
    aliases: ["nh", "n-hentai", "n-h", "n_hentai"],
    description: "Get an random doujin | Search for an doujin",
    usage: '[sauce code]',
    run: async (client, message, args) => {

          //Checks channel for nsfw
  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
        if (!args[0]) {
            const random = await api.randomDoujinID();
            await api.fetchDoujin(random).then(doujin => {
                const images = doujin.pages;
                let pg = 0;
                let embed = new MessageEmbed()
                    .setTitle(doujin.titles.english)
                    .setColor("RANDOM")
                    .setThumbnail(doujin.thumbnail.url)
                    .setImage(images[pg].url)
                    .setURL(images[pg].url)
                    .setFooter("Tags: " + doujin.tags.map(t => t.name).join(', '));

                message.channel.send(embed).then(mssg => {
                    mssg.react("⬅️");
                    mssg.react("➡️");

                    const collector = mssg.createReactionCollector(
                        (reaction, user) =>
                            ["⬅️", "➡️"].includes(reaction.emoji.name) &&
                            user.id === message.author.id,
                        { time: 120000 }
                    );

                    collector.on("collect", reaction => {

                        reaction.users.remove(message.author).then(async () => {
                            if (reaction.emoji.name === "➡️") {


                                if (!images[pg + 1]) {
                                    pg = pg
                                } else {
                                    pg = pg + 1
                                }
                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("RANDOM")
                                    .setThumbnail(doujin.thumbnail.url)
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setFooter("Tags: " + doujin.tags.map(t => t.name).join(', '));
                                await mssg.edit(embed);
                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }

                            else if (reaction.emoji.name === "⬅️") {


                                if (!images[pg - 1]) {

                                    pg = pg
                                } else {
                                    pg = pg - 1
                                }

                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("RANDOM")
                                    .setThumbnail(doujin.thumbnail.url)
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setFooter("Tags: " + doujin.tags.join(', '));
                                await mssg.edit(embed);

                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }
                        })

                    });

                    collector.on('end', collected => {
                        if (mssg) {
                            mssg.reactions.removeAll()
                        }
                    });
                })
            });
        } else {
            await api.fetchDoujin(args[0]).then(doujin => {
                const images = doujin.pages;
                let pg = 0;
                let embed = new MessageEmbed()
                    .setTitle(doujin.titles.english)
                    .setColor("RANDOM")
                    .setThumbnail(doujin.thumbnail.url)
                    .setImage(images[pg].url)
                    .setURL(images[pg].url)
                    .setFooter("Tags: " + doujin.tags.join(', '));

                message.channel.send(embed).then(mssg => {
                    mssg.react("⬅️");
                    mssg.react("➡️");

                    const collector = mssg.createReactionCollector(
                        (reaction, user) =>
                            ["⬅️", "➡️"].includes(reaction.emoji.name) &&
                            user.id === message.author.id,
                        { time: 120000 }
                    );

                    collector.on("collect", reaction => {

                        reaction.users.remove(message.author).then(async () => {
                            if (reaction.emoji.name === "➡️") {


                                if (!images[pg + 1]) {
                                    pg = pg
                                } else {
                                    pg = pg + 1
                                }
                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("RANDOM")
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setThumbnail(doujin.thumbnail.url)
                                    .setFooter("Tags: " + doujin.tags.join(', '));
                                await mssg.edit(embed);
                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }

                            else if (reaction.emoji.name === "⬅️") {


                                if (!images[pg - 1]) {

                                    pg = pg
                                } else {
                                    pg = pg - 1
                                }

                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("RANDOM")
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setFooter("Tags: " + doujin.tags.join(', '));
                                await mssg.edit(embed);

                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }
                        })

                    });

                    collector.on('end', collected => {
                        if (mssg) {
                            mssg.reactions.removeAll()
                        }
                    });
                });

            });
        }
    },
};