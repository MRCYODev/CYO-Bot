

module.exports = {
    name: 'disable-chat-ai', 
    description: 'Remove the chat channel for the server',
    aliases: null,
    usage: null,
    timeout: 10000,
    
    run: async(client, message, args) => {
        if(!args[0]){
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You can\'t use this command. You should have `MANAGE_GUILD` (Manage Server) permission in order to use this command!');
        if(!message.channel.id === client.db.get(`channel_${message.guild.id}`)) return message.channel.send('This channel is not set as the chat channel!');
        client.db.delete(`channel_${message.guild.id}`)
        message.channel.send(`${message.channel.toString()} is no longer the chat channel`);
        } else {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You can\'t use this command. You should have `MANAGE_GUILD` (Manage Server) permission in order to use this command!');
            let channel = message.mentions.channels.first() || client.channels.cache.get(args[0]);
            if (!channel) return message.channel.send('No channel found');
            if (channel) {
        client.db.delete(`channel_${message.guild.id}`)
                message.channel.send(`${message.channel.toString()} is no longer the chat channel`);
                channel.send(`This channel is no longer a chat channel`)
            }
        }
        client.db.delete(`channel_${message.guild.id}`)
}}