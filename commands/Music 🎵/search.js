const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
const YouTube = require("youtube-sr");
const fs = require("fs");

module.exports = {

        name: "search",
        description: "Search Song in Youtube",
        usage: "<song_name>",
        aliases: ["sch"],
        timeout: 7000,

    run: async (client, message, args) => {
        let channel = message.member.voice.channel;
        if (!channel) return message.reply({embed: {
            color: 10038562,
            description: "I'm sorry but you need to be in a voice channel to play music! <a:x_:789158785540948008> "
          }});

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
        if (!searchString) return message.reply({embed: {
            color: 10038562,
            description: "You didn't poivide want i want to searchs <a:x_:789158785540948008> "
          }});

        var serverQueue = message.client.queue.get(message.guild.id);
        try {
            var searched = await YouTube.search(searchString, { limit: 10 });
            if (searched[0] == undefined) return message.reply({embed: {
                color: 10038562,
                description: "Looks like i was unable to find the song on YouTube <a:x_:789158785540948008> "
              }});
            let index = 0;
            let embedPlay = new MessageEmbed()
                .setColor("#2f3136")
                .setAuthor(`Results for \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                .setDescription(`${searched.map((video2) => `**${++index}  > ** [${video2.title}](${video2.url}) ➡ ${video2.durationFormatted}`).join("\n\n")}`)
                .setFooter("Type the number of the song to add it to the playlist || After 60 Second this message will be deleted");
            // eslint-disable-next-line max-depth
            message.channel.send(embedPlay).then((m) =>
                m.delete({
                    timeout: 55000,
                })
            );
            try {
                var response = await message.channel.awaitMessages((message2) => message2.content > 0 && message2.content < 11, {
                    max: 1,
                    time: 60000,
                    errors: ["time"],
                });
            } catch (err) {
                console.error(err);
                return message.channel.send({
                    embed: {
                        color: "RED",
                        description: "Nothing has been selected within **60 seconds**, the request has been canceled.",
                    },
                });
            }
            const videoIndex = parseInt(response.first().content);
            var video = await searched[videoIndex - 1];
        } catch (err) {
            console.error(err);
            return message.channel.send({
                embed: {
                    color: "RED",
                    description: "🆘  **|**  I could not obtain any search results",
                },
            });
        }

        response.delete();
        var songInfo = video;

        const song = {
            id: songInfo.id,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(10, " "),
            ago: songInfo.uploadedAt,
            duration: songInfo.durationFormatted,
            url: `https://www.youtube.com/watch?v=${songInfo.id}`,
            img: songInfo.thumbnail.url,
            req: message.author,
        };

        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
            .setAuthor("Song has been added to queue 🙋‍♂️🙋‍♀️")
            .setThumbnail(song.img)
            .setColor("#e1dddd")
            .setTitle(song.title)
            .setURL(song.url)
            .addField("Duration", song.duration)
            .addField("Requested by", song.req.tag)
            .setFooter(` Views: ${song.views} \n Uploaded at: ${song.ago}`);
            return message.channel.send(thing);
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
                            return message.reply({embed: {
                                color: 15844367,
                                description: `An unexpected error has occurred.\n Possible type \`${er}\``
                            }});
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
            let thing = new MessageEmbed()
                .setAuthor(`Music Started`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                .setThumbnail(song.img)
                .setColor("#2f3136")
                .setTitle(song.title)
                .setURL(song.url)
                .addField("Duration", song.duration)
                .addField("Requested by", song.req.tag)
                .setFooter(` Views: ${song.views} \n Uploaded at: ${song.ago}`);
            queue.textChannel.send(thing);
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            channel.guild.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error({embed: {
                color: 15844367,
                description: `I could not join the voice channel: ${error}`
            }});
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.reply({embed: {
                color: 15844367,
                description: `I could not join the voice channel: ${error}`
            }});
        }
    },
};
