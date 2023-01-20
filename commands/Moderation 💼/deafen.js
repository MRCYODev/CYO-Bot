module.exports = {
  name: "deafen",
  description: "Deafen an Member",
  usage: "(@user#1234) (reason)",
  aliases: null,
  timeout: 10000,

 run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("DEAFEN_MEMBERS"))
      return message.channel.send({embed: {
        color: 10038562,
        description: `You don't have **DEAFEN_MEMBERS** permissions <a:x_:789158785540948008>`
    }});

    const deafenUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!deafenUser) return message.reply('Please Specify an member')
    const deafenReason = args.join(" ").slice(23);

    if (!message.member.hasPermission("DEAFEN_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send({embed: {
        color: 10038562,
        description: `You don't have **DEAFEN_MEMBERS** & **ADMINISTRATOR** permissions for that! <a:x_:789158785540948008>`
    }});

    if (deafenUser.voice.serverDeaf) {
      return message.channel.send({embed: {
        color: 10038562,
        description: `User is not in a voice channel or isn't deafened <a:x_:789158785540948008>`
    }});
    }

    deafenUser.voice.setDeaf(true, "deafenReason");

    
    message.channel.send({embed: {
        color: '#65dd35',
        description: `${deafenUser} was Successfully **Deafenned** Reason: **${deafenReason}** <a:check:789158626459385917>`
    }});
  },
};