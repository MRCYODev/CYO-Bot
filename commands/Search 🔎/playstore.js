const Discord = require('discord.js')
const playstore = require('google-play-scraper')

module.exports = {
    name: "playstore",
    aliases: ['googleplay', 'playss', 'glplay'],
    usage: '(minectaft)',
    description: "Search any game/application on playstore",
    timeout: 9000,

    run: async (client, message, args) => {


 //Checks channel for nsfw
 var errMessage = "This is not an NSFW Channel";
 if (!message.channel.nsfw) {
     message.react('🔞');

     return message.reply(errMessage)
     .then(msg => {
     msg.delete({ timeout: 10000 })
     })
     
 }

        if (!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description:  "Write the name of the application in the playstore <a:x_:789158785540948008> "
          }})
        playstore.search({
            term: args.join(" "),
            num: 1 }).then(pl => {
                let store;
                store = JSON.parse(JSON.stringify(pl[0]))
                let embed = new Discord.MessageEmbed()
                .setURL(store.url)
                .setTitle(store.title)
                .setThumbnail(store.icon)

                .addFields(
                    { name: 'Developer', value: store.developer, inline: true },
                    { name: 'Score', value: store.score, inline: true },
                    { name: 'Price', value: store.priceText, inline: true },
                    { name: 'Stars', value: store.scoreText, inline: true },
                    { name: 'AppId', value: store.appId, inline: true },
                    { name: 'Summary', value: store.summary, inline: true },
                )
                .setColor('RANDOM')
                .setTimestamp()
                message.channel.send(embed)
            })
        }
    }