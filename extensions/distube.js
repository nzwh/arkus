   
   const DisTube = require('distube');
   const Discord = require('discord.js');
   
   module.exports.run = async (client) => {

        try {

        client.distube = new DisTube(client, 
            { searchSongs: false, emitNewSongOnly: false });

        client.distube
            .on("playSong", async (message, queue, song) => {
                try {

                    // now playing popup
                    const play_embed = new Discord.MessageEmbed()
                        .setDescription(`Now playing: [${(song.name.length > 50) ? song.name.substr(0, 50-1) + '...' : song.name}](${song.url})  •  [<@${song.user.id}>]`)
                        .setColor(message.guild.me.displayHexColor)
                        .setFooter(`Arkus.wav  •  Queued by ${song.user.username}   `)
                        .setTimestamp()
                    message.channel.send(play_embed);
                        
                } catch(err) {
                    console.log(err); //! Command did not go through
                }
            })

            .on("addSong", (message, queue, song) => {
                try {

                    // add queue popup
                    const queue_embed = new Discord.MessageEmbed()
                        .setDescription(`Queued [${(song.name.length > 60) ? song.name.substr(0, 60-1) + '...' : song.name}](${song.url})`)
                        .setColor('#848cd4')
                        .setFooter(`Arkus.wav  •  Queued by ${message.author.username}   `)
                        .setTimestamp()
                    message.channel.send(queue_embed);

                } catch(err) {
                    console.log(err); //! Command did not go through
                }
            })

            .on("addList", (message, queue, playlist) => {
                //? Nothing yet
            })

            .on("error", (message, err) => {
                console.log(err);
                client.distube.skip(message);
            })

            .on("playList", (message, queue, playlist, song) => {
                try {
 
                    // add playlist popup
                    const playlist_embed = new Discord.MessageEmbed()
                        .setDescription(`Added playlist [${(playlist.name.length > 40) ? playlist.name.substr(0, 40-1) + '...' : playlist.name}](${playlist.url}) [+${playlist.songs.length} tracks]`)
                        .setColor('#e4c390')
                        .setFooter(`Arkus.wav  •  Added by ${message.author.username}   `)
                        .setTimestamp()
                    message.channel.send(playlist_embed);

                    // now playing popup
                    const play_embed = new Discord.MessageEmbed()
                        .setDescription(`Now playing [${(song.name.length > 50) ? song.name.substr(0, 50-1) + '...' : song.name}](${song.url})  •  [<@${song.user.id}>]`)
                        .setColor(message.guild.me.displayHexColor)
                        .setFooter(`Arkus.wav  •  Queued by ${song.user.username}   `)
                        .setTimestamp()
                    message.channel.send(play_embed);

                } catch(err) {
                    console.log(err); //! Command did not go through
                }
            })

            .on("finish", message => {
                try {

                    // tracklist finished popup
                    const finish_embed = new Discord.MessageEmbed()
                        .setDescription(`✦ No more tracks left in queue.`)
                        .setColor('#bf3939')
                    message.channel.send(finish_embed);

                } catch(err) {
                    console.log(err); //! Command did not go through
                }
            })

            .on("noRelated", message => {
                try {

                    // no related music popup
                    const related_embed = new Discord.MessageEmbed()
                        .setDescription(`✦ Can't find any related music.`)
                        .setColor('#bf3939')
                    message.channel.send(related_embed);

                } catch(err) {
                    console.log(err); //! Command did not go through
                }
            })

            .on("initQueue", queue => {
                queue.autoplay = false;
                queue.volume = 100;
                queue.repeatMode = 0;
            });

        } catch(err) {
            console.log("  ❱❱ There was a problem in distube.js. \n\n", err)
        }
    }