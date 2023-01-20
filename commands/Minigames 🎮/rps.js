const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
const Discord = require("discord.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rps",
    aliases: ['rock-paper-scissors'],
    usage: null,
    description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
    timeout: 10000,
    
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('__**RPS GAME**__ [Rock, Paper, Scissors]')
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .addFields(
                { name: '🗻 - Rock', value: '\u200B', inline: true },
                { name: '✂ - Paper', value: '\u200B', inline: true },
                { name: '📰 - Scissors', value: '\u200B', inline: true },
            )
            .setColor("RANDOM")
            .setTimestamp();

        const m = await message.channel.send(embed);
        // Wait for a reaction to be added
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        // Get a random emoji from the array
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        // Check if it's a win/tie/loss
        const result = await getResult(reacted, botChoice);
        // Clear the reactions
        await m.reactions.removeAll();

        const final = new MessageEmbed()
            .setTitle('__**Results**__')
            .setColor("RANDOM")
            .setTimestamp()
            .addField(result, `**Your Choice** ${reacted} __VS__ **Bot Choice** ${botChoice}`);
                
        m.edit(final);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return '**You won! <a:check:783294559908003880>**';
            } else if (me === clientChosen) {
                return "**It's a tie! 👔**";
            } else {
                return "**You lost! <a:x_:783295121847746590>**";
            }
        }
    }
}


