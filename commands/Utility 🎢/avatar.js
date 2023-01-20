const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: null,
    usage: "(@user#1234/ID)",
    description: "Display user avatar picture",
    timeout: 6000,

    run: async (client, message, args) => {

        let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }
    
  // 4096 is the new biggest size of the avatar.
  // Enabling the dynamic, when the user avatar was animated/GIF, it will result as a GIF format.
  // If it's not animated, it will result as a normal image format.
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`🖼 - ${user.tag} Avatar`)
  .setDescription(`**[PNG](${user.displayAvatarURL({ format: 'png', size: 4096 })})** | **[JPEG](${user.displayAvatarURL({ format: 'jpeg', size: 4096 })})** | **[JPG](${user.displayAvatarURL({ format: 'jpg', size: 4096 })})** | **[GIF](${user.displayAvatarURL({ format: 'gif', size: 4096, dynamic: true })})** | **[WEBP](${user.displayAvatarURL({ format: 'webp', size: 4096 })})**`)
  .setColor('#2892c5')
  .setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
  .setTimestamp()
  
  return message.channel.send(embed);
    }
}
