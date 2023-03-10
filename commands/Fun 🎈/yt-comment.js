const Discord = require('discord.js');
const canvacord = require('canvacord')

module.exports = {

        name: 'yt-comment',
        description: 'Shows your text as a Youtube Comment',
        aliases: ['comment'],
        usage: '<text>',
        timeout: 4000,
        
    run: async (client, message, args) => {
        const comment = args.join('');
        if(!comment) return message.channel.send(` Provide something to Comment!`)
        try {    
        let yt = await canvacord.Canvas.youtube({"avatar":message.author.displayAvatarURL({format: "png"}),"username":message.author.username, "content":args.join(" ")})
        let attachment = new Discord.MessageAttachment(yt, 'comment.png')
        message.channel.send(attachment)
    }catch(err) {
        const embed2 = new Discord.MessageEmbed()
    .setTitle(` Something went wrong.\nNote : It won't work if the User contains Unwanted characters in his Username.`)
    .setColor('RED')
    message.channel.send(embed2)
    }

    }
}