const Discord = require('discord.js')

  module.exports = { 
    name: "ban",
    aliases: ['bn'],
    usage: '(@user#1234) [reason]',
    description: "ban member from current server",
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
          
                let reason = args.slice(1).join(" ");
                const mentionedMember = message.mentions.members.first();

                if (!reason) reason = 'No Reason given. <a:x_:789158785540948008> ';
                if (!args[0]) return message.channel.send({embed: {
                  color: 10038562,
                  description: 'You Must Mention Someone to ban. ❓ '
                }});
                if (!mentionedMember) return message.channel.send({embed: {
                  color: 10038562,
                  description: 'The Member Mentioned is not in The Server. <a:x_:789158785540948008> '
                }});
                if (!mentionedMember.bannable) return message.channel.send({embed: {
                  color: 10038562,
                  description: 'I Cannot ban that Member <a:x_:789158785540948008> '
                }});

                const banEmbed = new Discord.MessageEmbed()
                .setTitle(`You Have Been Banned From ${message.guild.name}`)
                .setDescription(`Reason for being banned: **${reason}**`)
                .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
                .setColor("RED")
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

                await mentionedMember.send(banEmbed).catch(err => console.log(err));
                await mentionedMember.ban({
                    days: 7,
                    reason: reason
                }).catch(err => console.log(err)).then(() => message.channel.send({embed: {
                  color: 3066993,
                  description: `** <a:check:789158626459385917> Successfully Banned** - `  + mentionedMember.user.tag
                }})
              )
          }

        }
        
