const Discord = require('discord.js')
const db = require('quick.db')
const imdb = require("imdb-api");


module.exports = {
    name: 'imdb',
    description: 'Searches for a movie with info',
    usage: 'imdb (movie name)',
    aliases: ['movimdb', 'movie'],
    timeout: 9000,
    
    run: async (client, message, args) =>{


 //Checks channel for nsfw
 var errMessage = "This is not an NSFW Channel";
 if (!message.channel.nsfw) {
     message.react('🔞');

     return message.reply(errMessage)
     .then(msg => {
     msg.delete({ timeout: 10000 })
     })
     
 }

        if (!args.length) {
            return message.channel.send({embed: {
                color: 10038562,
                description:  "Please give the name of movie or series <a:x_:789158785540948008> "
              }});
          }
      
          const imob = new imdb.Client({ apiKey: "5e36f0db" }); //You need to paste you imdb api
      
          let movie = await imob.get({ name: args.join(" ") });
      
          let embed = new Discord.MessageEmbed()
          .setColor("GOLD")
          .setTitle(movie.title)
          .setURL(movie.imdburl)
          .setDescription(movie.plot)
          .setThumbnail(movie.poster)
          .addField("❯ Rate", movie.rating, true)
          .addField("❯ Time", movie.runtime, true)
          .addField("❯ Awards", movie.awards, true)
          .addField("❯ Langueages", movie.languages, true)
          .addField("❯ Genres", movie.genres, true)
          .addField("❯ PG", movie.rated, true)
          .addField("❯ Coutry", movie.country, true)
          .addField("❯ Released", movie.released)
          .setFooter('All information is provided by IMDB')
      
          message.channel.send(embed)
    }
}