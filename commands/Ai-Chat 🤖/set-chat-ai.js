

module.exports = {
    name: 'set-chat-ai', 
    description: 'Set Bot Channel for chat with ai', 
    aliases: null,
    usage: '[#channel]',
    timeout: 10000,

    run: async(client, message, args) => {
if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You can\'t use this command. You should have `MANAGE_GUILD` (Manage Server) permission in order to use this command!');
    if (!args[0]) return message.channel.send('Please provide a channel');
    let channel = message.mentions.channels.first() || client.channels.cache.get(args[0]);
    if (!channel) return message.channel.send('No channel found');
    if (channel) {
        message.channel.send(`Set the chat channel to ${channel.toString()}`);
        channel.send(`This channel has been set as the chat channel`)
    }
    client.db.set(`channel_${message.guild.id}`, channel.id)
}
}