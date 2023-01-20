const kitsu = require('node-kitsu');

module.exports = {
    name: 'manga',
    aliases: null,
    usage: '(manga-name)',
    description: 'Search manga',
    timeout: 9000,

    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("Please specify a manga name.");
        let aniname = args.join(" ");
        let results;
        try {
            results = await kitsu.searchManga(aniname, 0);
        } catch (ex) {
            if (ex.message.indexOf("ERR_UNESCAPED_CHARACTERS") !== -1) {
                await message.channel.send("This command only accepts English and Romaji titles. Please translate the title and try again.");
            } else {
                await message.channel.send("An error occurred running this command. Please try again later.");
            }
            return client.console.error(`${ex}`);
        }
        if (!results) {
            await message.channel.send("No results found");
            return;
        }
        let fieldarry = [];
        for (let i=0;i<results.length;i++) {
            let aniresult = results[i].attributes;
            fieldarry[i] = {
                "name": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
                "value": `Rating: ${aniresult.averageRating || 0}%\nChapters: ${aniresult.chapterCount || 0}\nStatus: ${aniresult.status === "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`}\n[Kitsu.io](https://kitsu.io/manga/${aniresult.slug})`
            };
        }
        await message.channel.send({
            "embed": {
                "title": "Search Results",
                "description": "\u200b",
                "color": "RANDOM",
                "fields": fieldarry
            }
        });
    },
};