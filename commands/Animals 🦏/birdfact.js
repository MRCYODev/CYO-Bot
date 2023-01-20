const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "birdfact",
    aliases: null,
    usage: null,
    description: "Bird Informatnion",
    timeout: 5000,

    run: async (client, message, args) => {    
        const facts = "https://some-random-api.ml/facts/bird"

        let fact, responses;
        try {

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send({embed: {
                color: 10038562,
                description: "An error occured, please try again! <a:x_:789158785540948008> "
              }})
        }

        const embed = new MessageEmbed()
        .setTitle(`Bird Fact 🐦`)
        .setColor(`RANDOM`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(fact.fact)

        await message.channel.send(embed)
    }
}
