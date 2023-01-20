const Discord = require('discord.js');
const process = require("child_process");

module.exports = {
    name: "exec",
    aliases: [],
    description: "exec extend command",
    timeout: 10000,

    run: async (client, message, args) => {

        if (message.author.id !== "682340655229435963") return;
    


    // Optional.

    message.channel.send({embed: {
        color: 10038562,
        description: "Please wait... <a:x_:789158785540948008> "
      }}).then(m => m.delete({timeout: 10}));



    process.exec(args.join(" "), (error, stdout) => {

        let response = (error || stdout);

        message.channel.send(response, {code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err));

    })



    // Don't forget this one. :D

    return;
    }
}