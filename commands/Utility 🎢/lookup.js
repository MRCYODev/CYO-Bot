const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "lookup",
    aliases: null,
    usage: "[google.com]",
    description: "Resolve an IP address or hostname with additional info.",
    timeout: 6000,

    run: async (client, message, text) => {
        const resl = text;
      var res = await fetch(`http://ip-api.com/json/${text}`); // fetch json data from ip-api.com

      // json results
      const json = await res.json();
      function embedResolve() {
        //embed json results
        return new MessageEmbed()
          .setColor('#42aaf5')
          .setAuthor(
            'IP/Hostname Resolver',
            'https://i.imgur.com/3lIiIv9.png',
            'https://ip-api.com'
          )
          .addFields(
            { name: 'Query', value: resl, inline: true },
            { name: 'Resolves', value: json.query, inline: true },
            { name: '‎', value: '‎', inline: true },
            {
              name: 'Location',
              value: `${json.city}, ${json.zip}, ${json.regionName}, ${json.country}`,
              inline: false
            },
            { name: 'ORG', value: `${json.org}‎`, inline: true }, // organisation who own the ip
            { name: 'ISP', value: json.isp, inline: true }, // internet service provider
            { name: 'OBO', value: json.as, inline: false }
          )
          .setTimestamp(); //img here
      }
      message.channel.send(embedResolve(json.isp));
    }, catch (e) {
      console.error(e);
      message.channel.send(
        'Something went wrong looking for that result, is the api throttled?'
      );
      return;
    }
}
