const urban = require("relevant-urban");
const Discord = require('discord.js');

module.exports = {
    name: "urban",
    aliases: null,
    usage: null,
    description: "UrBan command",
    timeout: 6000,
    
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

 let result = await urban(args[0]).catch(e => {

    return message.channel.send({embed: {
        color: 10038562,
        description: `Unknown word phrase of **${args[0]}**, please try again. <a:x_:789158785540948008> `
      }});

})



const embed = new Discord.MessageEmbed()

.setColor(0x7289DA)

.setTitle(result.word)

.setURL(result.urbanURL)

.setDescription(`**Definition:** \n*${result.definition}* \n\n**Example:** \n*${result.example}*`)

.addField("Author", result.author, true)

.addField("Rating", `👍 ${result.thumbsUp.toLocaleString()} | 👎 ${result.thumbsDown.toLocaleString()}`)

.setTimestamp()



if (result.tags.length > 0 && result.tags.join(" ").length < 1024) {

    embed.addField("Tags", result.tags.join(", "), true);

}

return message.channel.send(embed);
    }
}