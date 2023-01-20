const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'trump',
	description: 'Make trump tweet something.',
	aliases: null,
	usage: '<text>',
    timeout: 4000,
	
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send({embed: {
                    color: 10038562,
                    description: `<a:x_:789158785540948008> Please provide valid text  `
                }});
		}

		const url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send({embed: {
                color: 10038562,
                description: `<a:x_:789158785540948008> An error occured, please try again `
            }});
		}
		const attachment = new MessageAttachment(response.message, 'trump.png');
		return message.channel.send(attachment);
	},
};