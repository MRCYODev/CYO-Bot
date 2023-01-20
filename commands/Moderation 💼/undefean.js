module.exports = {
    name: "undefean",
    description: "Undefean an Member",
    usage: "(@user#1234) (reason)",
    aliases: null,
    timeout: 10000,

 run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("DEAFEN_MEMBERS"))
      return message.channel.send(
        errorEmbed({embed: {
            color: 10038562,
            description: `You don't have **DEAFEN_MEMBERS** permissions <a:x_:789158785540948008>`
        }})
      );

    const undeafenUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!undeafenUser) return message.reply('Please Specify an member')
    if (!message.member.hasPermission("DEAFEN_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send({embed: {
        color: 10038562,
        description: `You don't have **DEAFEN_MEMBERS** & **ADMINISTRATOR** permissions for that! <a:x_:789158785540948008>`
    }});

    if (!undeafenUser.voice.serverDeaf) {
      return message.channel.send(
        {embed: {
            color: 10038562,
            description: `User is not in a voice channel or isn't deafened <a:x_:789158785540948008>`
        }});
    }

    undeafenUser.voice.setDeaf(false, "undeafenReason");

    message.channel.send({embed: {
        color: '#65dd35',
        description: `**${undeafenUser.user.tag}** was successfully undeafened from the server. <a:check:789158626459385917>`
    }});
  },
};