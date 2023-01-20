const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch') // npm i node-fetch


    module.exports = {
        name: 'npm-search',
        aliases: ['npm-sea', 'npm-pkg', 'npm-find'],
        description: 'Shows Info About Serched User',
        usage: '[package]',
        timeout: 9000,

        run: async (client, message, args) =>  {

            const npm = args[0]
            if(!npm) return message.reply('Please Provide A Valid Package To Search.') // If No Packge In Searched.
    
            let response
            try {
                response = await fetch('https://api.npms.io/v2/search?q=' + args[0]).then(res => res.json()) // Search For Package
            }
            catch (e) {
                return message.reply('An Error Occured, Try Again Later.')    
            }
            try {
            const pkg = response.results[0].package
            const embed = new MessageEmbed()
            .setTitle(pkg.name)
            .setColor('RED')
            .setURL(pkg.links.npm)
            .setThumbnail('https://media.discordapp.net/attachments/786304795354726471/811968295505887252/npm-logo.png')
            .setDescription(pkg.description)
            .addField('Author:', pkg.author ? pkg.author.name : 'N/A') // 'None' Because If No Author Is Their
            .addField('Version:', pkg.version)
            .addField('Repository:', pkg.links.repository ? pkg.links.repository : 'N/A')  // 'None' Because If No Repository Is Their
            .addField('Maintainers:', pkg.maintainers ? pkg.maintainers.map(e => e.username).join(', ') : 'N/A') // 'None' Because If No Maintainer Are Their
            .addField('Keywords:', pkg.keywords ? pkg.keywords.join(', ') : 'N/A') // 'None' Because If No keyWords Are Their
            .setTimestamp()
            message.channel.send(embed)
            }
            catch (e) {
                message.reply('Thats Not A Valid Package.') // If No Packges Found
            }
        }
    }