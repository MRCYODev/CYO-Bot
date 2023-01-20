const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "random-number",
    aliases: null,
    description: "Get Random Number!",
    usage: null,
    timeout: 6000,
    run: async (client, message, args) => {

      //Start
      
      let result = Math.floor((Math.random() * 1000001));
      
      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Random Number Is`)
      .setDescription([result])
      .setFooter(`1 - 1.000.000`)
      .setTimestamp();
      
      message.channel.send(embed)

      //End

  }
};