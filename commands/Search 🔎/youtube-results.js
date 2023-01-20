
const Discord = module.require("discord.js");

module.exports = {
    name: "youtube-results",
    description: "Search For results on Youtube",
    aliases: null,
    usage: '(text)',
    timeout: 9000,

    run: async(client, message, args) => {
    const text = args.join(' ');
    const search = args.join('+');
    if (!text) {
    return message.channel.send("Enter some text to search for")
    }
    const embed = new Discord.MessageEmbed()
    .setTitle("Youtube Results")
    .addField(`You Searched for`, `${text}`)
    .addField(`Results`, `[Link](https://youtube.com/results?search_query=${search})`)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}