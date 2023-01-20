const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "fortune",
    aliases: null,
    usage: null,
    description: "Replies with a fortune cookie tip!",
    timeout: 6000,

    run: async (client, message, args) => {


      const res = await fetch('http://yerkee.com/api/fortune');
      const json = await res.json();
      const embed = new MessageEmbed()
        .setColor('#F4D190')
        .setAuthor('Fortune Cookie', 'https://i.imgur.com/58wIjK0.png', 'https://yerkee.com')
        .setDescription(json.fortune)
        .setTimestamp()
        .setFooter('Powered by yerkee.com', '');
      return message.channel.send(embed);
    }, catch (e) {
      message.say(':x: Could not obtain a fortune cookie!');
      return console.error(e);
    }
}
