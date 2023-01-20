module.exports = {
    name: 'setavatar',
    description: 'Set Bot avatar',
    run: async (client, message, args) => {
      const redMessage = (message, title, description = null) => {
        message.channel.send({
          embed: {
            color: 15158332,
            title: title,
            description: description,
            author: {
              name: message.client.user.username,
              icon_url: message.client.user.avatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
              })
            }
          }
        })
      }
        if (message.author.id !== "682340655229435963") {
            return message.channel.send(`This is a **Owner** only command`);
          }
        if (message.deletable) {
          message.delete()
        }
        if (!args || args.length < 1) {
          return redMessage(
            message,
            'Please provide me with a **valid link** to set my avatar.'
          )
        }
        client.user.setAvatar(args.join(' '))
    
        message.channel
          .send('*My Profile picture has been changed!**')
          .then((m) => m.delete({ timeout: 10000 }))
      }
    }
