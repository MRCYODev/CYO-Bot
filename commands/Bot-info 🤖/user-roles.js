const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'user-roles',
    aliases: null,
    usage: '(@user#1234)',
    description: 'Show User Roles in current server',
    timeout: 8000,

    /** 
    *  
    * @param {client} client
    * @param {message} message
    * @param {String[]} args
    */
        run: async(client, message, args) => {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if(!member) return message.reply('Please Specify a member!');

            const memberRoles = member.roles.cache
                .filter((roles) => roles.id !== message.guild.id)
                .map((role) => role.toString());


                message.channel.send(
                    new MessageEmbed()
                    .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
                    .setDescription(`${member}'s roles => ${memberRoles}`)
                    .setColor("#2f3136")
                )
    }
}
