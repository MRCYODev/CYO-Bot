const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "panda",
    aliases: null,
    usage: null,
    description: "Random Picture of panda",
    timeout: 5000,

    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/panda";
    
        let image, response;
        
        try {
            response = await axios.get(url);
            image = response.data;

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
        .setTitle(`Panda 🐼`)
        .setColor(`RANDOM`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setImage(image.link)

        await message.channel.send(embed)
    }
}