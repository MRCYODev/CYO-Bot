  
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kanye",
    aliases: null,
    usage: null,
    description: "Get a random Kanye quote.",
    timeout: 4000,

    run: async (client, message, args) => {

fetch('https://api.kanye.rest/?format=json')
.then(res => res.json())
.then(json => {
  const embed = new MessageEmbed()
    .setColor('#AF6234')
    .setAuthor('Kanye West', 'https://i.imgur.com/SsNoHVh.png')
    .setDescription(json.quote)
    .setTimestamp()
    .setFooter('Powered by kanye.rest', '');
  message.channel.send(embed);
  return;
})
.catch(err => {
  message.say('Failed to deliver quote :sob:');
  return console.error(err);
});
}
};