
const Discord = module.require("discord.js");

module.exports = {
    name: "wide-avatar",
    description: "Make your avatar widened",
    aliases: null,
    usage: '(@user#1234)',
    timeout: 10000,
    run: async(client, message, args) => {
    const mention = message.mentions.members.first() || message.member;
    const avatar = mention.user.displayAvatarURL({dynamic: true, size: 2048, format: "png"});

        message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/wide?image=${avatar}`, name: "wideavatar.png"}]});
    }
}