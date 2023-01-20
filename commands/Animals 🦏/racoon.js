const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "racoon",
    aliases: null,
    usage: null,
    description: "Random Picture of racoon",
    timeout: 5000,

    run: async (client, message, args) => {
        const facts = "https://some-random-api.ml/facts/racoon"

        let fact, responses;
        try {
            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
        .setTitle(`Racoon 🦝`)
        .setColor(`RANDOM`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(fact.fact)

        await message.channel.send(embed)
    }
}