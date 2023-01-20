const {Collection, Client, Discord} = require('discord.js')

const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const mongoose = require('mongoose');

mongoose.connect('', {
    useUnifiedTopology : true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo DB!'))



client.on('ready', () => {
    setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 1800000);
});
const DBL = require("dblapi.js");
const dbl = new DBL('', client);

// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})



const fetch = require('node-fetch')


const config = require('./config.json')
const { GiveawaysManager } = require("discord-giveaways");
const prefix = config.prefix
const token = config.token
const moment = require("moment")
const db = require('quick.db')
client.commands = new Collection();
client.aliases = new Collection();
client.db = require("quick.db");
client.queue = new Collection();
module.exports = client;
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
const prefixSchema = require('./models/prefix')

client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))
        
        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }
    

    client.on("error", console.error);
    client.on("ready", () => {
        client.user.setPresence({
            activity: {name: `${prefix}help | ${prefix}invite`,
            type: "PLAYING"
        },
        status: 'dnd'
        }) 
        console.log(`${client.user.username} Ready!`)})

    //  ${client.guilds.cache.size} Servers | ${client.channels.cache.size} Channels | ${client.users.cache.size} Members | ${client.commands.size} Commands

    client.snipes = new Map();
    client.on('messageDelete', function(message, channel){
    client.snipes.set(message.channel.id,{
        content:message.content,
        author:message.author.tag,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null
    })
    })




client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
})


  
client.on('voiceStateUpdate', (old, New) => {
    if(old.id !== client.user.id) return
    if(old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.on("message", async message => {
if (message.channel.id === client.db.get(`channel_${message.guild.id}`)){
    if(message.author.bot) return;
    message.channel.startTyping()
      let mesg = encodeURIComponent(message.content)
      .then(res => res.json())
      .then(data => {
      message.channel.send(data.cnt);
      message.channel.stopTyping(true)
      
      });
  }
});




client.login(token)
