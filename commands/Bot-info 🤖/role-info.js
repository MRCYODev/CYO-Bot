const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "role-info",
    aliases: ['rol-in'],
    usage: '[@rolename]',
    description: "Checks Role information",
    timeout: 8000,

    run: async (client, message, args) => {
	// Check to see if a role was mentioned
	const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

	// Make sure it's a role on the server
	if (!role) {
		if (message.deletable) message.delete();
		message.channel.send({embed: {
            color: 10038562,
            description: "Provide an role <a:x_:789158785540948008> "
          }}).then(m => m.delete({ timeout: 10000 }));
		return;
	}
	// Send information to channel
	const embed = new MessageEmbed()
		.setColor(role.color)
		.setAuthor(message.author.tag, message.author.displayAvatarURL())
		.setDescription(('Role Name', role.name))
		.addField(('Role Members'), role.members.size, true)
		.addField(('Role Color'), role.hexColor, true)
		.addField(('Role Position'), role.position, true)
		.addField(('Role Mention'), `<@&${role.id}>`, true)
		.addField(('Role Hoisted'), role.hoist, true)
		.addField(('Role Mentionable'), role.mentionable, true)
		.addField(('Role Permission'), role.permissions.toArray().toString().toLowerCase().replace(/_/g, ' ').replace(/,/g, ' <<|>> '))
		.addField(('Role Created'), moment(role.createdAt).format('lll'))
		.setTimestamp()
		.setFooter(('ROLE_FOOTER', [`${message.author.tag}`, `${role.id}`]));
	message.channel.send(embed);
}
}