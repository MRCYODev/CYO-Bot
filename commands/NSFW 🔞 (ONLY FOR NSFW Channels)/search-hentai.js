const {MessageEmbed} = require('discord.js');
const booru = require('booru');

module.exports = {
    name: 'search-hentai',
    aliases: null,
    usage: '(hentai-name)',
    description: 'Search Hentai',
    
    run: async (client, message, args) => {

  //Checks channel for nsfw
  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        if (!args[0]) {return message.channel.send(new MessageEmbed().setDescription('You need to enter an search input').setColor('RANDOM'));}
        booru.search('danbooru', ["rating:explicit", args.join('_')], {random:true, limit:1}).then(booru.commonfy).then(posts => {
            for (let post of posts) {
                const embed = new MessageEmbed();
                embed.setTitle(`Hentai - ${args.join(' ')}`);
                embed.setImage(post.sample_url);
                embed.setURL(post.sample_url);
                embed.setFooter(`Requested by ${message.author.tag}`);
                embed.setTimestamp(Date.now());
                embed.setColor('RANDOM')
                message.channel.send(embed);
                if (post.sample_url.endsWith('.mp4')) message.channel.send('```Hentai - ' + args.join(' ') + "```\n\n" + post.sample_url);
            }
        }).catch((e) => {
            console.error(e);
            message.channel.send(new MessageEmbed().setDescription(`Can't find anything for ${args.join(' ')}\nI think you would search more as one tag.`))
        })
    },
};