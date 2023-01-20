const { tictactoe } = require('reconlx')

module.exports = {
    name: "tictactoe",
    aliases: ['ttt'],
    usage: "(@user#1234)",
    description: "TicTacToe mini game",
    timeout: 10000,
    
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send({embed: {
                color: 10038562,
                description: "Please specify a member <a:x_:789158785540948008> "
              }})
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}
