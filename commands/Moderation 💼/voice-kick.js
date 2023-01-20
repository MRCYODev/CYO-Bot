module.exports = {
    name: "voice-kick",
    description: "Kick's An Member From Voice Chat",
    timeout: 10000,
    aliases: null,
    usage: '(@user#1234)',
  run:async (client, message, args) => {
    if (!message.guild.me.hasPermission("MOVE_MEMBERS"))
      return message.channel.send({embed: {
        color: 10038562,
        description: `You don't have **MOVE_MEMBERS** permissions <a:x_:789158785540948008>`
    }});

    const kickUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!kickUser) return message.reply('Please Specify an member')
    const kickReason = args.join(" ").slice(23);

    if (!message.member.hasPermission("MOVE_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send({embed: {
        color: 10038562,
        description: `You don't have **MUTE_MEMBERS** & **ADMINISTRATOR** permissions for that! <a:x_:789158785540948008>`
    }});

    if (kickUser.hasPermission("MOVE_MEMBERS" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {
        color: 10038562,
        description: `User can't be disconnected. <a:x_:789158785540948008>`
    }});
    }

    if (!kickUser.voice.channel) {
      return message.channel.send({embed: {
        color: 10038562,
        description: `User is not in a voice at the moment. <a:x_:789158785540948008>`
    }});
    }

    if (!kickUser) return message.channel.send({embed: {
        color: 10038562,
        description: `User wasn't found <a:x_:789158785540948008>`
    }});

    kickUser.voice.kick(kickReason);


    message.channel.send({embed: {
        color: '#65dd35',
        description: `**${kickUser.user.tag}** was successfully disconnected from **${kickUser.voice.channel}**. \n\n Reason: **${kickReason}** <a:check:789158626459385917>`
    }});
  },
};