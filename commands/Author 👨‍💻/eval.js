const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "eval",
    aliases: [],
    description: "Evaluate Command",

    run: async (client, message, args) => {
      let owners = ["682340655229435963","660416568236441640"]

      if(!owners.includes(message.author.id)){
        return message.channel.send({embed: {
          color: 10038562,
          description: "You're not the owner of this bot! <a:x_:789158785540948008> "
        }})
      }
      
      const input = args.join(' ');
      if (!input) return message.channel.send({embed: {
        color: 10038562,
        description: "Please provide code to eval <a:x_:789158785540948008> "
      }});
      if(!input.toLowerCase().includes('Token')) {
  
        const embed = new MessageEmbed();
  
        
        try {
          let output = eval(input);
          if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
          
          embed
            .addField('__**Input**__ 📥', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
            .addField('__**Output**__ 📤', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
            .setColor('#66FF00');
  
            
        } catch(err) {
          embed
            .addField('__**Input**__ 📥', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
            .addField('__**Output**__ 📤', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
            .setColor('#FF0000');
        }
  
        message.channel.send(embed);
  
        
      } else {
        message.channel.send({embed: {
          color: 10038562,
          description: "(╯°□°)╯︵ ┻━┻ MY token. **MINE**. <a:x_:789158785540948008> "
        }});
      }
    }
  };
