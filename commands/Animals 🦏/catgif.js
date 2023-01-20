const Commando = require('discord.js-commando');
const request = require('request'); 

const Discord = require("discord.js")
module.exports = {
    name: "catgif",
    aliases: null,
    usage: null,
    description: "Random Gif cat",
    timeout: 5000,
    
    run: async (client, message, args) => {
        request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const embed = new Discord.MessageEmbed()
                    .setImage(body)
                    .setColor("#00ff00")
                    .setTitle("Gif Cat Mew mew... 😻")
                    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                   message.channel.send(embed)  
            }
        });
    }
}