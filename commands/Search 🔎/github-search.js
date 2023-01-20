const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch') // npm i node-fetch


    module.exports = {
        name: 'github-search',
        aliases: ['git-sea', 'git-acc', 'git-find'],
        description: 'Shows Info About Serched User',
        usage: '[username]',
        timeout: 9000,
        guildOnly: true,
        run: async (client, message, args) =>  {

            const name = args.join(' ')
            if(!name) return message.reply('Provide A Valid User To Search.') // If User Is Not Found On GitHub
            const url = `https://api.github.com/users/${name}` // Link From BOT Will Get Info
    
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('An Error Occured, Try Again Later.')
            }
    
            const embed = new MessageEmbed()
            .setColor('#2f3136')
            .setTitle(`${response.login}(${response.id})`)
            .setURL(response.html_url)
            .setThumbnail(response.avatar_url)
            .setDescription(response.bio ? response.bio : 'No Bio') // Bio Of User Searched
            .addFields({ name: "Public Repositories:" , value: `${response.public_repos.toLocaleString()}`, inline: true},
                       { name: "Followers:" , value: `${response.followers.toLocaleString()}`, inline: true},
                       { name: "Following:" , value: `${response.following.toLocaleString()}`, inline: true},
                       { name: "Email:" , value: `${response.email ? response.email : 'N/A'}`, inline: true},
                       { name: "Company:" , value: `${response.company ? response.commands : 'N/A'}`, inline: true},
                       { name: "Location:" , value: `${response.location ? response.location : 'N/A'}`, inline: true},
            )
            message.channel.send(embed)

    }
}