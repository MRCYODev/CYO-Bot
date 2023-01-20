const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'device',
	aliases: null,
	description: 'Tells you which devices a user is on.',
	usage: '<member>',
    timeout: 8000,
    
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${member.user.username}'s device`)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		if (member.presence.clientStatus.mobile) {
			embed.addFields([
				{ name: '📱 Mobile', value:'<:Online:791296906567483392>', inline: true },
				{ name: '🖥 Desktop', value:'<:Offline:791296906558570516>', inline: true },
				{ name: '🌐 Web', value:'<:Offline:791296906558570516>', inline: true },
			]);
		}
		else if (member.presence.clientStatus.desktop) {
			embed.addFields([
				{ name: '📱 Mobile', value:'<:Offline:791296906558570516>', inline: true },
				{ name: '🖥 Desktop', value:'<:Online:791296906567483392>', inline: true },
				{ name: '🌐 Web', value:'<:Offline:791296906558570516>', inline: true },
			]);
		}
		else if (member.presence.clientStatus.web) {
			embed.addFields([
				{ name: '📱 Mobile', value:'<:Offline:791296906558570516>', inline: true },
				{ name: '🖥 Desktop', value:'<:Offline:791296906558570516>', inline: true },
				{ name: '🌐 Web', value:'<:Online:791296906567483392>', inline: true },
			]);
		}


		message.channel.send(embed);
	},
};