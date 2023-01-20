const img = require('images-scraper')
const Discord = require('discord.js');

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name: "glimages",
    aliases: ['googleimages'],
    usage: 'glimages (something)',
    description: "Google search an images",
    timeout: 9000,

    run : async(client, message, args) => {


         //Checks channel for nsfw
         var errMessage = "This is not an NSFW Channel";
         if (!message.channel.nsfw) {
             message.react('🔞');
       
             return message.reply(errMessage)
             .then(msg => {
             msg.delete({ timeout: 10000 })
             })
             
         }

        const query = args.join(" ")
        if(!query) return message.channel.send({embed: {
            color: 10038562,
            description:  "Please enter the query. <a:x_:789158785540948008> "
          }})

        const results = await google.scrape(query, 1)

        const Embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setImage(results[0].url)
	.setTimestamp()
        message.channel.send(Embed);
    }
}