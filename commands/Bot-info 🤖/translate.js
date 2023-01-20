const Discord = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");


module.exports = {
    name: "translate",
    aliases: ['tr'],
    usage: 'language (use 2 letters like en or br or gr or hi)',
    description: 'Translate your language',
    timeout: 8000,
    run: async (client, message, args) => {

let language = args[0];
let text = args.slice(1).join(" ");

if (!language)
    return message.reply("What Language am i supposed to translate to?");
if (language.length !== 2)
    return message.reply(
        "Language must be 2 letter alias. Eg `English > en`"
    );
if (!text) return message.reply("What am I supposed to translate?");

const result = await translate(text, { to: language });

const Embed = new Discord.MessageEmbed()
        .setDescription(result.text)
        .setTitle('GOOGLE TRANSLATE')
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png')
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
        .setColor("BLUE");
       
        message.channel.send(Embed)
    }
};
