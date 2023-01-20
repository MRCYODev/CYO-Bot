module.exports = {
    name: 'kill',
    aliases: null,
    description: 'Kill User',
    usage: '[user]',
    timeout: 6000,
    
    run: async (client, message, args) =>  {
        if (!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description: "You have to mention someone <a:x_:789158785540948008> "
        }})
        if (!message.mentions.users.first()) return message.channel.send({embed: {
            color: 10038562,
            description: "Mention someone before I kill you with a stick you piece of shit <a:x_:789158785540948008> "
        }})
        const killing = [`${message.author.username} gave ${args[0]} a blowtorch in confusion of a flamethrower. The king was not impressed`, `${args[0]} forgot to go to incognito before searching how to kill someone. You should've just say how to kill someone legally smh.`, `${args[0]} is a noob thats all i gotta say`, `${args[0]} was stabbed by an unknown person, when the hospital was involved, the nurse was the murderer plot twist`, `${message.author.username} pushed ${args[0]} down the staircase of hell.`]
        message.channel.send(killing[Math.floor(Math.random() * killing.length)])
    }
}