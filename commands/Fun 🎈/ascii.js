
const figlet = require('figlet');

module.exports = {
    name: "ascii",
    aliases: null,
    usage: "(text)",
    description: "Converts text to ascii",
    timeout: 4000,

    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send({embed: {
            color: 10038562,
            description: `Please provide some text <a:x_:789158785540948008> `
          }});

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log({embed: {
                    color: 10038562,
                    description: `Something went wrong <a:x_:789158785540948008> `
                  }});
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send({embed: {
                color: 10038562,
                description: `Please provide text shorter than 2000 characters <a:x_:789158785540948008> `
              }})

            message.channel.send('```' + data + '```')
        })
    }
}