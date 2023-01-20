  
const { MessageEmbed } = require('discord.js');
const { oneLine, stripIndent } = require('common-tags');

module.exports = {
    name: "clear",
    aliases: ['purge', 'clr', 'cln', 'bulk'],
    usage: '<optional number>',
    description: "Purge messages in current channel",
    timeout: 10000,

    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **MANAGE_MESSAGES** Permissions to Delete Messages ❌"
          }});
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {
            color: 10038562,
            description: "Your role don't have **MANAGE_MESSAGES** Permissions to Delete Messages ❌"
          }});
        if (!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description: "**You must state a number of messages to purge ❌**"
          }});
        const amonutToDelete = Number(args[0], 10);

        if (isNaN(amonutToDelete)) return message.channel.send({embed: {
            color: 10038562,
            description: "**Number Started is not a valid number. ❌**"
          }});
        if (!Number.isInteger(amonutToDelete)) return message.channel.send({embed: {
            color: 10038562,
            description: "**Number Started must be a whole number. ❌**"
          }});
        if (!amonutToDelete || amonutToDelete < 2 || amonutToDelete > 100) return message.channel.send({embed: {
            color: 10038562,
            description: "**The Number started must be between 2 <|> 100 ❌**"
          }});
        const fetched = await message.channel.messages.fetch({
            limit: amonutToDelete
        });

        try {
            await message.channel.bulkDelete(fetched)
                .then(messages => message.channel.send({embed: {
                    color: 3066993,
                    description: `** <a:check:789158626459385917> Successfully Deleted ${messages.size} messages!**`,
                    timestamp: new Date(),
                    footer: {
                        text: `This message will be delete in 10 Seconds`
                      },
                  }})).then(m => m.delete({ timeout: 10000 }));
        } catch (err) {
            console.log(err); {
                
                message.channel.send({embed: {
                    color: 15844367,
                    description: `**💻 I Was unable to delete the amount started make sure they are within 14 days old.**`,
                    footer: {
                      text: `This message will be delete in 30 Seconds`
                    },
                  }}).then(m => m.delete({ timeout: 30000 }));
            }
        }
    }
}
