const client = require('../index');
const { MessageEmbed } = require('discord.js');
const logsChannel = '807958308606443541';


client.on("guildCreate", (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
        .setTitle("NEW SERVER!")
        .setDescription('**__Guild Info__**')
        .addField('> Guild Name', `\`\`\`js\n${guild.name}\`\`\``)
        .addField('> Guild ID', `\`\`\`js\n${guild.id}\`\`\``)
        .addField('> Guild Members', `\`\`\`js\n${guild.memberCount}\`\`\``)
    //  .addField('> Owner Name', `\`\`\`js\n${message.guild.owner.user.username}\`\`\``)
    //  .addField('> Owner ID', `\`\`\`js\n${message.guild.ownerID}\`\`\``)
        .setFooter(`Currently in ${client.guilds.cache.size} Guilds!`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor("GREEN")
    )
})



client.on("guildDelete", (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
        .setTitle("REMOVED SERVER!")
        .setDescription('**__Guild Info__**')
        .addField('> Guild Name', `\`\`\`js\n${guild.name}\`\`\``)
        .addField('> Guild ID', `\`\`\`js\n${guild.id}\`\`\``)
        .addField('> Guild Members', `\`\`\`js\n${guild.memberCount}\`\`\``)
     // .addField('> Owner ID', `\`\`\`js\n${message.guild.ownerID}\`\`\``)
    //  .addField('> Owner Name', `\`\`\`js\n${message.guild.owner.user.username}\`\`\``)
        .setFooter(`Currently in ${client.guilds.cache.size} Guilds!`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor("RED")
    )
})
