const Discord = require("discord.js");

module.exports = {
    name: "morse",
    aliases: null,
    usage: '[text]',
    description: "Morse Encode/Decode",
    timeout: 4000,

    run: async (client, message, args) => {

 
    let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
    morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
    text = args.join(" ").toUpperCase();
    if (!text) return message.channel.send('Enter text or code to be decoded or encoded') // but you can change the answer :)

    while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
    text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
    }
    if (text.startsWith(".") || text.startsWith("-")) {
    text = text.split(" ");
    let length = text.length;
    for (i = 0; i < length; i++) {
        text[i] = alpha[morse.indexOf(text[i])];
    }
    text = text.join("");
    } else {
    text = text.split("");
    let length = text.length;
    for (i = 0; i < length; i++) {
        text [i] = morse[alpha.indexOf(text[i])];
    }
    text = text.join(" ");
    }
    let morsereader = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Morse Code Translator')
    .setDescription("🏹🎙 Result was: \n ```"+text+"```")
    await message.channel.send(morsereader)
    }

    }
