const {MessageEmbed} = require('discord.js');
const fetch = require('node-superfetch');

module.exports = {
    name: 'anime-memes',
    aliases: null,
    usage: null,
    description: 'Random anime memes from reddit',
    timeout: 10000,
    run: async (client, message) => {
        fetch.get(`https://www.reddit.com/r/animemes/.json`).end((err, res) => {
            if (err) console.error(err);
            const allowed = message.channel.nsfw ? res.body.data.children : res.body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return message.channel.send('It seems we are out of memes');
            const randomnumber = Math.floor(Math.random() * allowed.length);
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(allowed[randomnumber].data.title)
                .setImage(allowed[randomnumber].data.url)
                .setTimestamp(Date.now())
                .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
            message.channel.send(embed)
        });
    },
};