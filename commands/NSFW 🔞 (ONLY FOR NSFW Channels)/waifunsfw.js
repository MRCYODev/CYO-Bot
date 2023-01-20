const snek = require('snekfetch');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'waifunsfw',
    usage: null,
    aliases: null,
    description: 'random nsfw waifu pictures',
    run: async (client, message) => {

          //Checks channel for nsfw
  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('🔞');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        snek.get('https://waifu.pics/api/nsfw/waifu').end((err, res) => {
            if (err) return console.error(err);
            let embed = new MessageEmbed();
            embed.setColor('RANDOM')
            embed.setTitle('Random NSFW Waifu');
            embed.setImage(res.body.url);
            embed.setURL(res.body.url);
            embed.setFooter(`Random waifu requested by ${message.author.tag}`, message.author.avatarURL());
            embed.setTimestamp(Date.now());
            message.channel.send(embed);
        });
    },
};