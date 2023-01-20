const Discord = module.require("discord.js");

module.exports = {
   name: "orange-text",
   description: " Colors the Text woth Orange Color",
   aliases: null,
   usage: '(message)',
   timeout: 4000,

   run: async(client, message, args) => {
   const text = args.join(" ");
   if (!text) {
   return message.channel.send({embed: {
    color: 10038562,
    description: "Please enter some text <a:x_:789158785540948008> "
}})
   }
   message.channel.send(`\`\`\`fix\n${text}\n\`\`\``)
}
}