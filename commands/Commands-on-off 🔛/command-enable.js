const schema = require('../../models/command')

module.exports = {
    name : 'cmd-enable',
    aliases: null,
    usage: '[command-name]',
    description: 'Enable Bot Commands',
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
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  message.channel.send({embed: {
                    color: 10038562,
                    description: `Enabled __**${cmd}**__ <a:check:789158626459385917> `
                  }})
              }  else return message.channel.send({embed: {
                color: 10038562,
                description: `That command isnt turned **off** <a:x_:789158785540948008> `
              }})
          }
        })
    }
}