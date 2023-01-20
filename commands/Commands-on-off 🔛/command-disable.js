const schema = require('../../models/command')

module.exports = {
    name : 'cmd-disable',
    aliases: null,
    usage: '[command-name]',
    description: 'Disable Bot Commands',
    timeout: 3000,


    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {
            color: 10038562,
            description: `You need **ADMINISTRATOR** permissions to use this command <a:x_:789158785540948008> `
          }})
        const cmd = args[0];
        if(!cmd) return message.channel.send({embed: {
            color: 10038562,
            description: `Please specify a **Command** <a:x_:789158785540948008> `
          }})
        if(!!client.commands.get(cmd) === false) return message.channel.send({embed: {
            color: 10038562,
            description: `This command does not **Exist** <a:x_:789158785540948008> `
          }});
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send({embed: {
                    color: 10038562,
                    description: `This command has already been **Disabled.** <a:x_:789158785540948008> `
                  }});
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            message.channel.send({embed: {
                color: 10038562,
                description: `Command __${cmd}__ has been **Disabled** <a:check:789158626459385917> `
              }})
        })
    }
}