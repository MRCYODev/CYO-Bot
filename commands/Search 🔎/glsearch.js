const Discord = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: "glsearch",
    aliases: ['googlesearch'],
    usage: 'glsearch (something)',
    description: "Google search everything for you",
    timeout: 9000,

    run: async(client, message, args) => {


         //Checks channel for nsfw
         var errMessage = "This is not an NSFW Channel";
         if (!message.channel.nsfw) {
             message.react('🔞');
       
             return message.reply(errMessage)
             .then(msg => {
             msg.delete({ timeout: 10000 })
             })
             
         }

        let googleKey = "AIzaSyAv_FSIKhhkMykvrx5-LsVEbnPizCnUSG4";

        let csx = "237f3b3ff74374b15";
    
        let query = args.join(" ");
    
        let result;
    
    
    
        if (!query) return message.channel.send({embed: {
            color: 10038562,
            description:  "Please enter the query. <a:x_:789158785540948008> "
          }});
    
    
    
        href = await search(query);
    
        if (!href) return message.channel.send({embed: {
            color: 10038562,
            description:  "Unknown search. <a:x_:789158785540948008> "
          }});
    
    
    
        const embed = new Discord.MessageEmbed()
    
        .setTitle(href.title)
    
        .setDescription(href.snippet)
    
        .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.
    
        .setURL(href.link)
    
        .setColor(0x7289DA)
    
        .setFooter("Powered by Google")
    
    
    
        return message.channel.send(embed);
    
    
    
        async function search(query) {
    
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
    
                key: googleKey, cx: csx, safe: "off", q: query
    
            });
    
    
    
            if (!body.items) return null;
    
            return body.items[0];
    
        }

        message.channel.send(embed);
    }
}