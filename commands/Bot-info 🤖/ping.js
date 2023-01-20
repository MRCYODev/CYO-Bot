  
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ['p', 'letency'],
    description: "Ping Bot Speed",
    usage: null,
    timeout: 8000,

    run: async (client, message, args) => {
        
        const m = await message.channel.send("🤖 Pinging...");
		const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.addField("⌛ Bot Letency", `**${m.createdTimestamp - message.createdTimestamp}ms**`)
        .addField("❤️ Websocket", `**${Math.floor(client.ws.ping)}ms**`)
        .setTimestamp()
		return m.edit(`🏓 Pong!`, embed);
		}, catch (error) {
		return message.channel.send({embed: {
            color: 10038562,
            description: `Something went wrong: ${error.message} <a:x_:789158785540948008> `
          }});
       
        
        }
    }