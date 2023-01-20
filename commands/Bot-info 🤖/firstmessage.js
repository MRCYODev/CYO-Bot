const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "firstmessage",
    aliases: ['frmess'],
    usage: null,
    description: "First Message Writed in current channel",
    timeout: 8000,

    run: async (client, message, args) => {
	try {
		const messages = await message.channel.messages.fetch({ after: 1, limit: 1 });
		const fMessage = messages.first();
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setThumbnail(fMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setAuthor(fMessage.author.tag, fMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription(fMessage.content)
			.setTimestamp(fMessage.createdAt)
			.setFooter(`❯❯❯ID: ${fMessage.id}`)
			.addField('❯❯❯Jump', fMessage.url);
		message.channel.send(embed);
	} catch (e) {
		console.log(e);
	}
}
}