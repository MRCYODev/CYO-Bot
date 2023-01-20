const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'quotes',
	description: 'Get a random inspiring quote.',
	aliases: null,
	usage: null,
	timeout: 6000,
	run: async (client, message, args) => {
		const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				':x: An error occured, please try again!',
			);
		}
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setDescription(response.quoteAuthor)
			.setTitle(response.quoteText)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};