  
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "insult",
    aliases: null,
    usage: null,
    description: "Generate an evil insult!",
    timeout: 4000,

    run: async (client, message, args) => {
   fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
   .then(res => res.json())
   .then(json => {
     const embed = new MessageEmbed()
       .setColor('#E41032')
       .setAuthor('Evil Insult', 'https://i.imgur.com/bOVpNAX.png', 'https://evilinsult.com')
       .setDescription(json.insult)
       .setTimestamp()
       .setFooter('Powered by evilinsult.com', '');
     return message.channel.send(embed);
   })
   .catch(err => {
     message.channel.send(':x: Failed to deliver insult!');
     return console.error(err);
   });
}
};