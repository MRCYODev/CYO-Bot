const Discord = module.require("discord.js");
const flip = require("flip-text");

module.exports = {
    name: "flip-text",
    description: "Flip some text",
    usage: "<text>",
    aliases: null,
    timeout: 4000,
    
    run: async(client, message, args) => {
      if (args.length < 1) {
        return message.channel.send({embed: {
            color: 10038562,
            description: "Please enter some text to flip <a:x_:789158785540948008> "
        }})
      }
  args.reverse();
  var flipped = [];
  
  args.forEach((arg) => {
      flipped.push(flip(arg));
  });
  
  message.channel.send(flipped.join(" "));
}
}