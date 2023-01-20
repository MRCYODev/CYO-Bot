const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "pandafact",
    aliases: null,
    usage: null,
    description: "Panda Informantion",
    timeout: 5000,

    run: async (client, message, args) => {
        const facts = "https://some-random-api.ml/facts/panda"

        let fact, responses;
        try {
            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
        .setTitle(`Panda Fact 🐼`)
        .setColor(`RANDOM`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(fact.fact)

        await message.channel.send(embed)
    }
}