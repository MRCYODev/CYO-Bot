const Discord = require('discord.js')

  module.exports = { 
    name: "kick",
    aliases: ['kck'],
    usage: '(@user#1234) [reason]',
    description: "kick member from current server",
    timeout: 10000,

        run: async (client, message, args) => {
                if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({embed: {
                    color: 10038562,
                    description: "You do not have **KICK_MEMBERS** Permissions to kick someone ❌"
                  }});
                if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send({embed: {
                    color: 10038562,
                    description: "Your role don't have **KICK_MEMBERS** Permissions to kick someone ❌"
                  }});
            
                  let reason = args.slice(1).join(" ");
                  const mentionedMember = message.mentions.members.first();

                  if (!reason) reason = 'No Reason given. ❌';
                  if (!args[0]) return message.channel.send({embed: {
                    color: 10038562,
                    description: 'You Must Mention Someone to kick. ❓ '
                  }});
                  if (!mentionedMember) return message.channel.send({embed: {
                    color: 10038562,
                    description: 'The Member Mentioned is not in The Server. ❌'
                  }});
                  if (!mentionedMember.kickable) return message.channel.send({embed: {
                    color: 10038562,
                    description: 'I Cannot kick that Member ❌'
                  }});

                  const kickEmbed = new Discord.MessageEmbed()
                  .setTitle(`You Have Been Kicked From ${message.guild.name}`)
                  .setDescription(`Reason for being kicked: **${reason}**`)
                  .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
                  .setColor("RED")
                  .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                  .setTimestamp();

                  await mentionedMember.send(kickEmbed).catch(err => console.log(err));
                  await mentionedMember.kick({
                      reason: reason
                  }).catch(err => console.log(err)).then(() => message.channel.send({embed: {
                    color: 3066993,
                    description: `** <a:check:789158626459385917> Successfully kicked** - `  + mentionedMember.user.tag
                  }})
                )
            }

          }
          
