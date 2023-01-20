const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'report',
    aliases: ['repbug', 'bug', 'repbot'],
    usage: '[bug]',
    description: "report cyo bot for bugs/errors",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

     run: async(client, message, args) => {
         const owner = client.users.cache.get('682340655229435963');
     
         const query = args.join(" ");
         if(!query) return message.reply('Please Specify a query');

         const reportEmbed = new MessageEmbed()
            .setColor("YELLOW")
            .setTitle('__New Bug!__')
            .addField('Author', message.author.toString(), true)
            .addField('Guild', message.guild.name, true)
            .addField('Report Bug', query)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
       
        owner.send(reportEmbed)


        const reportEmbed1 = new MessageEmbed()
            .setAuthor(`${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
            .setColor("GREEN")
            .setDescription(`__Success__ ✅ Your **Bug** has Been Submited! \n\n __Your Report:__ 📛 \n > **${query}** `)
            .setFooter('Thank you so much for your feedback 💘')
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            return message.channel.send(reportEmbed1)
        }
        

}
