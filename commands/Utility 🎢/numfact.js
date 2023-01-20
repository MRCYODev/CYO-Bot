const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'numfact',
	description: 'Get a number fact from the internet.',
	aliases: [],
	usage: '<number>',
	timeout: 6000,
	run: async (client, message, args) => {
		const number = args[0];
		if(isNaN(args[0])) {
			return message.channel.send({embed: {
				color: 10038562,
				description: "Please provide a valid number ❌"
			  }}
				
			);
		}

		try {
			const text = await fetch(`http://numbersapi.com/${number}`).then(res => res.text());
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setDescription(text)
				.setTitle('Number Fact')
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
		catch (e) {
			return message.channel.send(
				':x: An error occured, please try again!',
			);
		}

	},
};