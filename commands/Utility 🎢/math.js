const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "math",
    aliases: null,
    usage: '(1*2)',
    description: "Get the answer to a math problem",
    timeout: 6000,


    async run (client, message, args){

        if(!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description:  "Please provide a __question__ <a:x_:789158785540948008> "
          }});

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send({embed: {
                color: 10038562,
                description:  "Please provide a **__valid__** question <a:x_:789158785540948008> "
              }})
        }

        const embed = new Discord.MessageEmbed()
        .setColor('#cb92f8')
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}