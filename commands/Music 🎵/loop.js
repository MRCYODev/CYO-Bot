const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "loop",
    description: "Toggle music loop",
    usage: "loop",
    aliases: ["l"],
    timeout: 10000,


  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "",
                    description: `🔁  **|**  Loop is **\`${serverQueue.loop === true ? "Enabled ✅" : "Disabled ❌"}\`**`
                }
            });
        };
    return message.reply("There is nothing playing in this server.", message.channel);
  },
};
