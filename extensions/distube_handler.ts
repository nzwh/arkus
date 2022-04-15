
    import Discord, { Message } from 'discord.js';
    import DisTube, { Queue, Song, Playlist } from 'distube';
    import SuperClient from './super_client';

    import { YtDlpPlugin } from '@distube/yt-dlp';
    import { SpotifyPlugin } from '@distube/spotify';
    import { SoundCloudPlugin } from '@distube/soundcloud';

    export default async (client: SuperClient) => {
        
        client.distube = new DisTube(client, { 
            searchSongs: 10, emitNewSongOnly: false, youtubeDL: false,
            plugins: [
                new SpotifyPlugin({ emitEventsAfterFetching: true }),
                new SoundCloudPlugin(),
                new YtDlpPlugin()
            ]
        })

        client.distube
        .on('playSong', async (queue: Queue, song: Song) => { 

            console.log('playsong');
            try {
                if (song.playlist) {

                    let playlist = (song.playlist.name.length > 40) ? `${song.playlist.name.substring(0, 40-1)}...` : song.playlist.name
                    const playlist_embed = new Discord.MessageEmbed()
                        .setDescription(`Now playing: Playlist [${playlist}](${song.playlist.url}) [+${song.playlist.songs.length} tracks]`)
                        .setFooter({ text: `Arkus.wav  •  Queued by ${song.user!.username}   ` })
                        .setColor('#e4c390')
                        .setTimestamp()
                    queue.textChannel?.send({ embeds: [playlist_embed] });
                } 

                let default_color = queue.textChannel ? queue.textChannel?.guild!.me!.displayHexColor : '#FF0000';
                let now_playing = (song.name!.length > 50) ? `${song.name!.substring(0, 50-1)}...` : song.name;

                queue.textChannel?.messages.fetch({ limit: 1 })
                    .then(async (messages: Discord.Collection<string, Message>) => {

                    let last_user = messages.first()!;
                    const play_embed = new Discord.MessageEmbed()
                        .setDescription(`Now playing: [${now_playing}](${song.url})  •  [<@${song.user?.id}>]`)
                        .setFooter({ text: `Arkus.wav  •  Queued by ${song.user!.username}   ` })
                        .setColor(default_color)
                        .setTimestamp()

                    if (last_user.author.id === client.user!.id && last_user.embeds[0].description?.includes("Now playing")) {
                        last_user.edit({ embeds: [play_embed] });
                    } else {
                        queue.textChannel?.send({ embeds: [play_embed] });
                    }
                });
                
            } catch(err) {
                console.log("  ❱❱ There was an error at distube_handler:playSong.\n", err);
            }
        })

        .on('addSong', async (queue: Queue, song: Song) => {

            console.log("addsong");
            try {
                let now_playing = (song.name!.length > 60) ? `${song.name!.substring(0, 60-1)}...` : song.name;
                let default_color = queue.textChannel ? queue.textChannel?.guild!.me!.displayHexColor : '#FF0000';

                queue.textChannel?.messages.fetch({ limit: 1 })
                    .then(async (messages: Discord.Collection<string, Message>) => {

                    let last_user = messages.first()!;
                    const queue_embed = new Discord.MessageEmbed()
                        .setDescription(`Queued [${now_playing}](${song.url})`)
                        .setFooter({ text: `Arkus.wav  •  Queued by ${song.user!.username}   ` })
                        .setColor(default_color)
                        .setTimestamp()

                    if (last_user.author.id === client.user!.id && last_user.embeds[0].description?.includes("Queued")) {
                        last_user.edit({ embeds: [queue_embed] });
                    } else {
                        queue.textChannel?.send({ embeds: [queue_embed] });
                    }
                });
            } catch(err) {
                console.log("  ❱❱ There was an error at distube_handler:addSong.\n", err); 
            }
        })

        .on("addList", async (queue: Queue, playlist: Playlist) => {

            try {
                let playlist_name = (playlist.name.length > 40) ? `${playlist.name.substring(0, 40-1)}...` : playlist.name
                const playlist_embed = new Discord.MessageEmbed()
                    .setDescription(`Added playlist [${playlist_name}](${playlist.url}) [+${playlist.songs.length} tracks]`)
                    .setFooter({ text: `Arkus.wav  •  Added by ${playlist.user!.username}   ` })
                    .setColor('#e4c390')
                    .setTimestamp()
                queue.textChannel?.send({ embeds: [playlist_embed] });
            } catch(err) {
                console.log("  ❱❱ There was an error at distube_handler:addList.\n", err);
            }
        })

        .on("noRelated", async (queue: Queue) => {

            try {
                const related_embed = new Discord.MessageEmbed()
                    .setDescription(`✦ Can't find any related music.`)
                    .setColor('#bf3939')
                queue.textChannel?.send({ embeds: [related_embed] });
            } catch(err) {
                console.log("  ❱❱ There was an error at distube_handler:noRelated.\n", err); //! Command did not go through
            }
        })

        .on('finish', async (queue: Queue) => {

            try {
                const finish_embed = new Discord.MessageEmbed()
                    .setDescription(`✦ No more tracks left in queue.`)
                    .setColor('#bf3939')
                queue.textChannel?.send({ embeds: [finish_embed] });
            } catch(err) {
                console.log("  ❱❱ There was an error at distube_handler:finish.\n", err);
            }
        })

        .on("initQueue", queue => {

            queue.autoplay = false;
            queue.volume = 100;
            queue.repeatMode = 0;
        })

        .on("error", (channel, err: Error) => {

            const error_embed = new Discord.MessageEmbed()
                .setDescription(`✦ An error occurred.`)
                .setColor('#bf3939')
            channel.send({ embeds: [error_embed] });
            console.log("  ❱❱ There was an error at distube_handler.ts.\n", err);
        })
    }