const Discord = require('discord.js')

module.exports = { 
  name: "unban",
  aliases: ['ubn', 'unbn'],
  usage: '(ID) [reason]',
  description: "unban member from current server",
  timeout: 10000,

  run: async (client, message, args) => {
          if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: {
              color: 10038562,
              description: "You do not have **BAN_MEMBERS** Permissions to ban someone ❌"
            }});
          if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: {
              color: 10038562,
              description: "Your role don't have **BAN_MEMBERS** Permissions to ban someone ❌"
            }});
      
            let reason = args.slice(1).join(" ");
            let userID = args[0];

            if (!reason) reason=  'No Reason given. ❌';
            if (!args[0]) return message.channel.send({embed: {
              color: 10038562,
              description: 'You Must State to unban ❌'
            }});
            if (!isNaN(args[1])) return message.channel.send({embed: {
              color: 10038562,
              description: 'The ID started is not a number ❌'
            }})

            message.guild.fetchBans().then(async bans => {
              if (bans.size == 0) return message.channel.send({embed: {
                  color: 10038562,
                  description: 'This Server does not have anyone banned ❌'
                }})
                let bUser = bans.find(b => b.user.id == userID);
                if (!bUser) return message.channel.send({embed: {
                  color: 10038562,
                  description: 'The User ID Started is not banned ❌'
                }})
                await message.guild.members.unban(bUser.user, reason).catch(err => {
                  console.log(err);
                  return message.channel.send({embed: {
                      color: 10038562,
                      description: 'Something Went wrong unbanning the id. 💻'
                    }});
                  }).then(() => {
                    message.channel.send({embed: {
                      color: 3066993,
                      description:  `** <a:check:789158626459385917> Successfully Unbanned** - <@${args[0]}>`
                    }})
                })
            })
          
      }

    }
    