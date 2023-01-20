const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Discord = require('discord.js')

const flags = {
	DISCORD_EMPLOYEE: '<:DiscordStaff:800706016089866240> Discord Employee',
	DISCORD_PARTNER: '<:DiscordPartner:800706275939450901> Discord Partner',
	BUGHUNTER_LEVEL_1: '<:BugHunter:800706647336943676> Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: '<:BugHunterLVL2:800706814953914398> Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: '<:hypesquad:800707013473861643> HypeSquad Events',
	HOUSE_BRAVERY: '<:HouseofBravery:800707236318019584> House of Bravery',
	HOUSE_BRILLIANCE: '<:HouseofBrilliance:800707662731935804> House of Brilliance',
	HOUSE_BALANCE: '<:HouseofBalance:800708097286602752> House of Balance',
	EARLY_SUPPORTER: '<:EarlySupporter:800708347241693184> Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: '<:System:800710287950086155> System',
	VERIFIED_BOT: '<:VerifiedBot:800709965270220820> Verified Bot',
	VERIFIED_DEVELOPER: '<:VerifiedBotDeveloper:800710531093758022> Verified Bot Developer'
};

module.exports = {
    name: "user-info",
    aliases: ['ui', 'usin'],
    usage: '(@user#1234)',
    description: "Show info in current server",
    timeout: 8000,

    run : async(target, message) => {

        const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
        const userFlags = member.user.flags.toArray();
        
        let status;
        switch (member.user.presence.status) {
            case "online":
                status = "<:Online:791296906567483392> Online";
                break;
            case "dnd":
                status = "<:DnD:791296906420420618> DnD";
                break;
            case "idle":
                status = "<:ldle:791297271131013150> ldle";
                break;
            case "offline":
                status = "<:Offline:791296906558570516> Offline";
                break;
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor('#2f3136')
            .addFields(
                // Username
                { name: `✨ Username`, value: `> ${member.user.username}`, inline: true} ,
                // Discrim
                { name: `#️⃣ Discriminator`, value: `> ${member.user.discriminator}`, inline: true} ,
                // ID 
                { name: `💳 ID`, value: `> ${member.id}`} ,
                // Badges 
                { name: `🚩 Badges`, value: `> ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`} ,
                // Badges 
                { name: `🖼 Avatar`, value: `> [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`} ,
                // Account Creation Day 
                { name: `📅 Account Created at`, value: `> ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`} ,
                // Server Join Date
                { name: `🎟 Server Join Date`, value: `> ${moment(member.joinedAt).format('LL LTS')}`} ,
                // Status 
                { name: `🎈 User Status`, value: `> ${status}`} ,
                // Game
                { name: `🌌 Game`, value: `> ${member.user.presence.game || 'Not playing a game.'}`} ,
                // Highest Role
                { name: `🔼 Highest Role`, value: `>  ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`} ,
                // Hoist Role
                { name: `☄ Hoist Role`, value: `>  ${member.roles.hoist ? member.roles.hoist.name : 'None'}`} ,
                // Hoist Role
                { name: `🚩 Roles [${roles.length}]`, value: `> ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`} ,
                )
                .setTimestamp()
      return  message.channel.send(embed);
    }
}
