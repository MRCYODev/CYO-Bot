const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "whale",
    aliases: null,
    usage: null,
    description: "Random Picture of whale",
    timeout: 5000,
    
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/whale";
        

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;

        } catch (e) {
            return message.channel.send({embed: {
                color: 10038562,
                description: "An error occured, please try again! <a:x_:789158785540948008> "
              }})
        }

        const embed = new MessageEmbed()
            .setTitle(`Whale 🐳`)
            .setImage(image.link)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        await message.channel.send(embed)
    }
}