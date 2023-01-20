const Discord = require('discord.js')

  module.exports = { 
    name: "idban",
    aliases: ['idbn'],
    usage: '(ID) [reason]',
    description: "ban member from current server by id",
    timeout: 10000,

      run: async (client, message, args) => {
              if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: {
                  color: 10038562,
                  description: "You do not have **BAN_MEMBERS** Permissions to ban someone <a:x_:789158785540948008> "
                }});
              if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: {
                  color: 10038562,
                  description: "Your role don't have **BAN_MEMBERS** Permissions to ban someone <a:x_:789158785540948008> "
                }});



    let userID = args[0];

    let reason = args.slice(1).join(" ");



    if (!userID) return message.channel.send({embed: {
        color: 10038562,
        description: 'Please provide a valid user ID. <a:x_:789158785540948008> '
      }});

    if (isNaN(userID)) return message.channel.send({embed: {
        color: 10038562,
        description: 'User ID must be a number. ❓ '
      }});

    if (userID === message.author.id) return message.channel.send({embed: {
        color: 10038562,
        description: 'You can\'t ban yourself. <a:x_:789158785540948008> '
      }});

    if (userID === client.user.id) return message.channel.send({embed: {
        color: 10038562,
        description: 'You can\'t ban me. Why? <a:x_:789158785540948008> '
      }});



    if (!reason) reason = 'No Reason given. <a:x_:789158785540948008>';



    client.users.fetch(userID).then(async user => {

        await message.guild.members.ban(user.id, {reason: reason});

        return message.channel.send({embed: {
            color: 3066993,
            description: `** <a:check:789158626459385917> Successfully Banned** -  **${user.tag}** `
          }});

    }).catch(error => {



        // If the user is unavailable, return some errors. (Recommended)


        

        return message.channel.send(`An error occurred: **${error}**`);

    })

},
}