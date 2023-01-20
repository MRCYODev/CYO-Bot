module.exports = {
    name: "restart",
    aliases: [],
    description: "Restart Bot Command",
    timeout: 10000,

    run: async (client, message, args) => {

    if (message.author.id !== '682340655229435963') {
        return message.channel.send({embed: {
            color: 10038562,
            description: "You cannot use this command! <a:x_:789158785540948008> "
          }})
    }
    await message.channel.send(`<a:loading:789495382345383966> Restarting bot...`).then(m => m.delete({timeout: 5000}));
    process.exit(0);
    
    }
}
