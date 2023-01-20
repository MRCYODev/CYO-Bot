const { MessageEmbed } = require('discord.js');
const ms = require('ms');


module.exports = {
    name: "slowmode",
    aliases: ['slm', 'sm'],
    description: "Enable Slowmode In current server",
    usage: '[time]',
    timeout: 10000,
    
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: {
            color: 10038562,
            description: "You do not have **MANAGE_CHANNELS** Permissions to Enable/Disable Slowmode ❌"
          }}).then(m => m.delete({ timeout: 50000 }));

        if (!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description: "You dont specify a time! ❌"
          }}).then(m => m.delete({ timeout: 50000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'No Reason given';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send({embed: {
                color: 10038562,
                description: "Slowmode is already off! ❌"
              }}).then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Slowmode Disabled')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('not a valid time, please try again!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21601) return message.channel.send('That slowmode limit is too high, please enter anything lower than 6 hours.').then(m => m.delete({ timeout: 9000 }));

        if (currentCooldown === time) return message.channel.send(`Slowmode is already set to ${args[0]}`);

        embed.setTitle('__**Slowmode Enabled**__ <a:check:789158626459385917>') 
            .addField('**Slowmode**\ 🐌 ', args[0]) 
            .addField('Reason: ', reason)
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()
            .setColor('#2f3136');
            message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}
