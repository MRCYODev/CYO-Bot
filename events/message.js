const client = require('../index')
const prefix = require('../config.json').prefix;
const db = require('../models/command')
const schema = require('../models/custom-commands');
const { Collection } = require('discord.js')
const ms = require('ms')
const Discord = require('discord.js')
const Timeout = new Collection();

client.on('message', async message => {
    const blacklist = require('../models/blacklist')
    if(!message.guild) return;
    const p = await client.prefix(message)
     if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '716693012507263036') return message.channel.send({embed: {
            color: 3447003,
            title: `Invite ${client.user.username}`,
            url: "https://discord.com/oauth2/authorize?client_id=716693012507263036&scope=bot&permissions=805314622",
            description: `Our Default Prefix In This **${message.guild.name}** Server And Bot Prefix is **${p}** 
             Note: ||If prefix don't work try to prefix-reset||`,
            fields: [{
                name: "Contact",
                value: "If you find a **bug** or **glitch** contact with [developer](https://discord.gg/tC4pzYu) \n\n __**Support CYO Bot**__ \n > <:PayPal:802589760098795530> [Paypal](https://www.paypal.com/donate?hosted_button_id=U3VMA6UAZLUAN) \n > <:Patreon:802589865064529981> [Patreon](https://www.patreon.com/CYOBot)"
              },
            ],
            timestamp: new Date(),
            footer: {
              text: "© MRCYO"
            }
          }
        })
    }
    if(message.author.bot) return;
    if(!message.content.startsWith(p)) return;
    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            if(!message.guild) return;
            if(!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(p.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if(cmd.length == 0 ) return;
            const data = await schema.findOne({ Guild: message.guild.id, Command: cmd});
            if(data) message.channel.send(data.Response);
            let command = client.commands.get(cmd)
            if(!command) command = client.commands.get(client.aliases.get(cmd));
            if(command) {
                if (command) {
                    if(command.timeout) {
                        if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
                        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
                        setTimeout(() => {
                            Timeout.delete(`${command.name}${message.author.id}`)
                        }, command.timeout)
                    }
                }
                const check = await db.findOne({ Guild: message.guild.id }) 
                if (check) {
                    if(check.Cmds.includes(command.name)) return message.channel.send({embed: {
                        color: 10038562,
                        description: `This Command has been disabled by __**Admins**__ <a:x_:789158785540948008> `
                      }})
                    command.run(client, message, args) 
                } else {
                    command.run(client, message, args) 
                }
                const channel = client.channels.cache.get('800340026805977160')

            const logs = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} || (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`${client.user.username} Bot Logs`)
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 4096 }))
            .setColor("RED")
            .addField(`Action:`, `\`\`\`${command.name}\`\`\``)
            .addField(`Command Used In`, `\`\`\`${message.guild.name}\`\`\``)
            .setTimestamp()
            channel.send(logs);
            }
        } else {
            message.channel.send({embed: {
                color: 10038562,
                description: `You are blacklisted! <a:x_:789158785540948008> `
              }})
        }
        
    })
})
