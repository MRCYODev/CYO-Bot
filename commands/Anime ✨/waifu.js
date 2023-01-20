const snek = require('snekfetch');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'waifu',
    usage: null,
    aliases: null,
    description: 'random waifu pictures',
    timeout: 10000,
    run: async (client, message) => {
        snek.get('https://waifu.pics/api/sfw/waifu').end((err, res) => {
            if (err) return console.error(err);
            let embed = new MessageEmbed();
            embed.setColor('RANDOM')
            embed.setTitle('Random Waifu');
            embed.setImage(res.body.url);
            embed.setURL(res.body.url);
            embed.setFooter(`Random waifu requested by ${message.author.tag}`, message.author.avatarURL());
            embed.setTimestamp(Date.now());
            message.channel.send(embed);
        });
    },
};