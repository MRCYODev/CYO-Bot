const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "rate",
    aliases: null,
    description: "Bot Rate Your Given Thing!",
    usage: "<text>",
    timeout: 6000,
    run: async (client, message, args) => {

        //Start

        let Content = args.join(" ");

        if (!Content) return message.channel.send(`Please Give Me Something To Rate!`);

        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`I Rate`)
            .setDescription(`${Math.floor(Math.random() * 11)}/10 To ${Content}`)
            .setFooter(`${message.author.username}`)
            .setTimestamp();

        message.channel.send(embed)

        //End

    }
};