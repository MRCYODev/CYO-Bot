const Discord = require('discord.js');

module.exports = {
    name: "binary",
    aliases: null,
    description: "Convert text to binary or otherwise.",
    usage: "<encode | decode> <text>",
    timeout: 6000,

    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description: "Unknown parameter. Please choose the method first, either **decode** or **encode** it. <a:x_:789158785540948008> "
          }});

        let choice = ["encode", "decode"];
        if (!choice.includes(args[0].toLowerCase())) return message.channel.send({embed: {
                color: 10038562,
                description: "Unknown parameter. Please choose the method first, either **decode** or **encode** it. <a:x_:789158785540948008> "
              }});
    
        let text = args.slice(1).join(" ");
        // binary <encode | decode> <text>
        // binary encode blob development
    
        if (!text) return message.channel.send({embed: {
            color: 10038562,
            description: "Please __input__ some text. <a:x_:789158785540948008> "
          }});
    
        // Do this because more than that, the binary code wouldn't be fit anymore.
        if (text.length > 1024) return message.channel.send({embed: {
            color: 10038562,
            description: "That is way too much. The maximum character was 1,024. <a:x_:789158785540948008> "
          }});
    
        function encode(char) {
            return char.split("").map(str => {
                const converted = str.charCodeAt(0).toString(2);
                return converted.padStart(8, "0");
            }).join(" ")
        };
    
        function decode(char) {
            return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
        };
    
        if (args[0].toLowerCase() === "encode") {
            return message.channel.send(encode(text));
        } else if (args[0].toLowerCase() === "decode") {
            return message.channel.send(decode(text));
        };

        message.channel.send(embed);
    }
}