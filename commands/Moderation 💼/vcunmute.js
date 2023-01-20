module.exports = {
    name: "vcunmute",
    description: "Unmute An Member In Voice Chat",
    timeout: 10000,
    aliases: null,
    usage: '(@user#1234)',
  run:async (bot, message, args) => {
    if (!message.guild.me.hasPermission("MUTE_MEMBERS"))
      return message.channel.send({embed: {
        color: 10038562,
        description: `You don't have **MUTE_MEMBERS** permissions <a:x_:789158785540948008>`
    }});

    const unmuteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!unmuteUser) return message.reply('Please Specify an member')
    if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send({embed: {
        color: 10038562,
        description: `You don't have **MUTE_MEMBERS** & **ADMINISTRATOR** permissions for that! <a:x_:789158785540948008>`
    }});

    if (!unmuteUser.voice.serverMute) {
      return message.channel.send({embed: {
        color: 10038562,
        description: `User is not in a voice channel or is already **muted** <a:x_:789158785540948008>`
    }});
    }

    unmuteUser.voice.setMute(false);


    message.channel.send({embed: {
        color: '#65dd35',
        description: `**${unmuteUser.user.tag}** was successfully muted from the server <a:check:789158626459385917>`
    }});
  },
};