const Discord = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
    name: "myanimelist",
    description: "Get info about an anime",
    aliases: null,
    usage: "[anime]",
    timeout: 9000,

    run: async (client, message, args) => {
        //command
        const search = `${args}`;
        if(!search)
        return message.reply('Please add a search query if invalid command will not work.');

        malScraper.getInfoFromName(search)
        .then((data) => {
        const malEmbed = new Discord.MessageEmbed()
            .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
            .setThumbnail(data.picture)
            .setColor('RANDOM')
            .addField('English Title', data.englishTitle, true)
            .addField('Japanese Title', data.japaneseTitle, true)
            .addField('Type', data.type, true)
            .addField('Episodes', data.episodes, true)
            .addField('Rating', data.rating, true)
            .addField('Aired', data.aired, true)
            .addField('Score', data.score, true)
            .addField('Score Stats', data.scoreStats, true)
            .setTitle(data.englishTitle)
            .setURL(data.url);

            message.channel.send(malEmbed);

        })
        }
        };