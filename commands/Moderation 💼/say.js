const { MessageFlags } = require("discord.js");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "say",
    aliases: null,
    usage: '(channel) [text]',
    desciption: "Bot say in current channel anything did you type",
    timeout: 10000,
  
    run: async (client, message, args) => {
        
         if(!message.member.hasPermission("MANAGE_CHANNELS")) {
                    return message.channel.send({embed: {
                        color: 10038562,
                        description: "You do not have **MANAGE_CHANNELS** Permissions to use that command <a:x_:789158785540948008>"
                    }})
                }
    
        let msg;
        let textChannel = message.mentions.channels.first()
        

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`${msg}\``)
            .setColor('RANDOM')
            message.channel.send(embed)
        }
    }
}
