const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch') // npm i node-fetch


    module.exports = {
        name: 'wiki-search',
        aliases: ['wiki-sea', 'wikipedia', 'wiki-find', 'wiki'],
        description: 'Shows Info About Serched User',
        usage: '[question]',
        timeout: 9000,


        run: async (client, message, args) =>  {


                     //Checks channel for nsfw
         var errMessage = "This is not an NSFW Channel";
         if (!message.channel.nsfw) {
             message.react('🔞');
       
             return message.reply(errMessage)
             .then(msg => {
             msg.delete({ timeout: 10000 })
             })
             
         }
            
        const wiki = args.slice().join(' ')
        if(!wiki) return message.reply('Provide A Query To Search.') // If Nothing Is Searched
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}` // From Here BOT Will Search For It

        let response
        try {
            response = await fetch(url).then(res => res.json())
        }      
        catch (e) {
            return message.reply('An Error Occured, Try Again.')
        }

        try {
            if(response.type === 'disambiguation') { // If Their Are Many Results With Same Seached Topic
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title)
                .setURL(response.content_urls.desktop.page)
                .setDescription([` ${response.extract} \n [Link](${response.content_urls.desktop.page}).`]) // If Their Are Many Results With Same Seached Topic
                message.channel.send(embed)
            }
            else { // If Only One Result
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title)
                .setThumbnail(response.thumbnail.source)
                .setURL(response.content_urls.desktop.page)
                .setDescription(response.extract)
                message.channel.send(embed)
            }
        }
        catch {
            return message.reply('Provide A Valid Query To Search.') // If Searched Query Is Not Available
        }
    }
}