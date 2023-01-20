const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
        name: "play",
        description: "Play Song from youtube",
        usage: "<YouTube URL> | <song name>",
        aliases: ["pl"],
        timeout: 6000,

    run: async (client, message, args) => {
        let channel = message.member.voice.channel;
        if (!channel) return message.reply("I'm sorry but you need to be in a voice channel to play music!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.reply({embed: {
            color: 10038562,
            description: "I cannot connect to your voice channel, make sure I have the proper permissions! **CONNECT** Permissions <a:x_:789158785540948008> "
          }});
        if (!permissions.has("SPEAK")) return message.reply({embed: {
            color: 10038562,
            description: "I cannot speak in this voice channel, make sure I have the proper permissions! **SPEAK** Permissions <a:x_:789158785540948008> "
          }});

        var searchString = args.join(" ");
        if (!searchString) return message.reply("You didn't poivide want i want to play", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var serverQueue = message.client.queue.get(message.guild.id);

        let songInfo = null;
        let song = null;
        if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
            try {
                songInfo = await ytdl.getInfo(url);
                if (!songInfo) return message.reply("Looks like i was unable to find the song on YouTube", message.channel);
                song = {
                    id: songInfo.videoDetails.videoId,
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                    duration: songInfo.videoDetails.lengthSeconds,
                    ago: songInfo.videoDetails.publishDate,
                    views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);
                if (searched.videos.length === 0) return message.reply("Looks like i was unable to find the song on YouTube", message.channel);

                songInfo = searched.videos[0];
                song = {
                    id: songInfo.videoId,
                    title: Util.escapeMarkdown(songInfo.title),
                    views: String(songInfo.views).padStart(10, " "),
                    url: songInfo.url,
                    ago: songInfo.ago,
                    author: songInfo.author,
                    description: songInfo.description,
                    duration: songInfo.duration.toString(),
                    img: songInfo.image,
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        }

        if (serverQueue) {
            serverQueue.songs.push(song);
            let embed1 = new MessageEmbed()
                .setAuthor("Song has been added to queue 🙋‍♂️🙋‍♀️")
                .setThumbnail(song.img)
                .setColor("#e1dddd")
                .setTitle(song.title)
                .setURL(song.url)
                .addField("Duration", song.duration)
                .addField('Description', song.description)
                .addField("Requested by", song.req.tag)
                .setFooter(` Views: ${song.views} \n Uploaded at: ${song.ago}`);
            return message.channel.send(embed1);
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 50,
            playing: true,
            loop: false,
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async (song) => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
               
                message.client.queue.delete(message.guild.id);
                return;
            }
            let stream = null;
            if (song.url.includes("youtube.com")) {
                stream = await ytdl(song.url);
                stream.on("error", function (er) {
                    if (er) {
                        if (queue) {
                            queue.songs.shift();
                            play(queue.songs[0]);
                            return message.reply(`An unexpected error has occurred.\nPossible type \`${er}\``, message.channel);
                        }
                    }
                });
            }
            queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

            const dispatcher = queue.connection.play(ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 25, type: "opus" })).on("finish", () => {
                const shiffed = queue.songs.shift();
                if (queue.loop === true) {
                    queue.songs.push(shiffed);
                }
                play(queue.songs[0]);
            });

            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            let embed2 = new MessageEmbed()
            .setAuthor(`Music Started`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setImage(song.img)
            .setColor("#2f3136")
            .setTitle(song.title)
            .setURL(song.url)
            .addField("Duration", song.duration)
            .addField('Description', song.description)
            .addField("Requested by", song.req.tag)
            .setFooter(` Views: ${song.views} \n Uploaded at: ${song.ago}`);
            queue.textChannel.send(embed2);
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.reply(`I could not join the voice channel`);
        }
    },
};
