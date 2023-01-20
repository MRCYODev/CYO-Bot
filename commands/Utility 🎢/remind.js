const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")

module.exports = {
    name: "remind",
    aliases: ['timer'],
    usage: '(s/m/h/d) [message]',
    description: "Remind you something",
    timeout: 6000,

    run : async(client, message, args) => {
        let timeuser = args[0]
        let reason = args.slice(1).join(" ")
        // !remind 10m Dream Code Uploaded video
        
        if(!timeuser) return message.reply({embed: {
            color: 3447003,
            description: 'You should enter time (1s/1m/1h/1d)[seconds/minutes/hours/days] <a:x_:789158785540948008>'
          }})
        if(!reason) return message.reply({embed: {
            color: 3447003,
            description: 'You should enter **reason** <a:x_:789158785540948008>'
          }})
        
          db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
          message.channel.send({embed: {
              color: 3066993,
              description: '**Remind Has Been Set** <a:check:789158626459385917>'
            }})
          const interval = setInterval(function() {
        
        
            if(Date.now() > db.fetch(`remind.${message.author.id}`)){
                db.delete(`remind.${message.author.id}`)
                message.author.send({embed: {
                    color: 1752220,
                    description: `Hello <@${message.author.id}> Your **Remind: **__${reason}__`
                  }})
                .catch(e => console.log(e))
                clearInterval(interval)
            }
        
        },1000)
        }
    }
