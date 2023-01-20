const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');
const Discord = require('discord.js')

const region = {
  'us-central': '> :flag_us:  > US Central',
  'us-east': '> :flag_us:  > US East ',
  'us-south': '> :flag_us:  > US South',
  'us-west': '> :flag_us:  > US West',
  'europe': '> :flag_eu:  > Europe',
  'singapore': '> :flag_sg:  > Singapore',
  'japan': '> :flag_jp:  > Japan',
  'russia': '> :flag_ru:  > Russia',
  'hongkong': '> :flag_hk:  > Hong Kong',
  'brazil': '> :flag_br:  > Brazil',
  'sydney': '> :flag_au:  > Sydney',
  'southafrica': '> South Africa > :flag_za:'
};
const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = {
    name: "server-info",
    aliases: ['sin', 'si'],
    usage: null,
    description: "Show info in current server",
    timeout: 8000,

    run : async(client, message) => {

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
        const bots = members.filter(member => member.user.bot).size;

        const embed = new Discord.MessageEmbed()

        .setAuthor(`${message.guild.name} Information`, `${message.guild.iconURL()}`)
        .addFields(
        // Owner 
        { name: `<:Crown:791302761224470548> Owner`, value: `> ${message.guild.owner.user.tag}`, inline: true} ,
        // ID
        { name: ` <:IDCard:791303265978417152> Server ID `, value: `> ${message.guild.owner.id}`, inline: true},
        // Region
        { name: '<:Region:791306421438119946> Region', value: region[message.guild.region]},
        // Server Creation
        { name: `📅 Server Creation Date`, value: `>  ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`},
        // Total Roles
        { name: `<:Roles:800688085418639390> Total Roles`, value: `> ${message.guild.roles.cache.size} roles`, inline: true},
        // Total Members
        { name: '<:OoPikachu:791589172296286229> Total Members', value: `> ${message.guild.memberCount} Total`},
        // Humans
        { name: `Human(s) <:pingguy:791317707240374302>`, value: `> ${members.filter(member => !member.user.bot).size}`, inline: true},
        // Bots
        { name: `<:bot:789158519638196264> Bot(s)`, value: `> ${members.filter(member => member.user.bot).size}`, inline: true},
        // Total Emoji
        { name: `<:pepeOK:760573502892933131> Total Emoji Count`, value: `> ${emojis.size}`},
        // Animated emoji
        { name: `<a:peepoComfy:761527235240656896> Animated Emoji Count`, value: `> ${emojis.filter(emoji => emoji.animated).size}`, inline: true},
        // Regular emoji
        { name: `<:monkaGIGA:761527235412361216> Regular Emoji Count`, value: `> ${emojis.filter(emoji => !emoji.animated).size}`},
        // Text Channels
        { name: `<a:nanitext:800676903684931625> Text Channels`, value: `>  ${channels.filter(channel => channel.type === 'text').size}`, inline: true},
        // Voice Channels
        { name: `<:GoogleSpeak:800680931429056552> Voice Channels`, value: `>  ${channels.filter(channel => channel.type === 'voice').size}`, inline: true},
        // Boost Count
        { name: `<a:server_boosting:800682501663359006> Boost Count`, value: `>  ${message.guild.premiumSubscriptionCount || '0'}`},
        // Boost Tier
        { name: `<a:BoostTier:800686696492040222> Boost Tier`, value: `>  ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : '0'}`, inline: true},
        // Verification Level
        { name: `<:Verification:800689121668497419> Verification Level`, value: `>  ${verificationLevels[message.guild.verificationLevel]}`},
        // Verification Level
        { name: `<:Filter:800690577666211840> Explicit Filter`, value: `>  ${filterLevels[message.guild.explicitContentFilter]}`},
        )
        .addField('Server Member Status', [
            `**<:Online:791296906567483392> Online:** ${members.filter(member => member.presence.status === 'online').size}`,
            `**<:ldle:791297271131013150> Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
            `**<:DnD:791296906420420618> Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
            `**<:Offline:791296906558570516> Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
            '\u200b'
        ])
        .setThumbnail(message.guild.iconURL())
        .setColor('RANDOM')
        .setTimestamp()
        message.channel.send({embed});
    }
}

