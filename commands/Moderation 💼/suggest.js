const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "suggest",
  aliases: null,
  usage: "<message>",
  description: "Send your Suggestion",
  timeout: 10000,

  run: (client, message, args) => {

    
    if(!args.length) {
      return message.channel.send({embed: {
        color: 10038562,
        description: "Please Give the Suggestion Channel <a:x_:789158785540948008> "
      }})
    }
    
    let channel = message.guild.channels.cache.find((x) => (x.name === "suggestion" || x.name === "suggestions"))
    
    
    if(!channel) {
      return message.channel.send({embed: {
        color: 10038562,
        description: "there is no channel with name - suggestions <a:x_:789158785540948008> "
      }})
    }
                                                    
    
    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    //.setThumbnail(message.author.avatarURL())
    .setColor("PURPLE")
    .setDescription(`**New Suggestion!** \n`+ args.join(" "))
    .setTimestamp()
    
    
    channel.send(embed).then(m => {
      m.react("<:upvote:798249792022904953>")
      m.react("<:downvote:798249960441249824>")
      m.react("☠️")
    })
    

    
    message.channel.send({embed: {
            color: 3066993,
            description: `<a:check:789158626459385917> Success Your Suggestion has been send at: `  + `**${channel}**`
          }} )
    
  }
}
