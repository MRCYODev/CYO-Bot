const MessageEmbed = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: 'paypal',
    aliases: ['pay', 'paypl'],
    description: "support cyo bot developer",

    run: async (client, message, args) => {
const embed = new Discord.MessageEmbed()
    .setAuthor("Thank You For Sopport CYO Bot")
    .setColor('BLUE')
    .setDescription('You can make Monthly payment for better support 💘 [Click Here](https://www.paypal.com/donate?hosted_button_id=U3VMA6UAZLUAN) For Donate Or scan qr code')
    .setThumbnail('https://media.discordapp.net/attachments/786304795354726471/797071458450014218/QR_Code.png')
    return message.channel.send(embed)
    }

    }
