   
    import Discord, { ColorResolvable, Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import { colors } from '../../databases/customs.json';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {
           
            try {

                const u_channel = message.member?.voice?.channel;
                if (!u_channel) return message.channel.send('> You must be in a voice channel to use this command.')
                    .then(message => { setTimeout(() => { message.delete() }, 5000) });

                let queue = client.distube.getQueue(message);
                if (!queue) {

                    const warn = new Discord.MessageEmbed()
                        .setDescription("\`🏴\` ⟶ No tracks in queue.")
                        .setColor(colors.crimson as ColorResolvable);
                    return message.channel.send({ embeds: [warn] })
                        .then(message => { setTimeout(() => { message.delete() }, 5000) });

                } else if (queue.songs[0]) {

                    let current_track = queue.songs[0];
                    queue.songs[1] || queue.autoplay ? queue.skip() : queue.seek(current_track.duration);

                    const main = new Discord.MessageEmbed()
                        .setDescription(`✦ Skipped ${(current_track.name!.length > 60) ? `${current_track.name!.substring(0, 60-1)}...` : current_track.name}.`)
                        .setFooter({ text: `Arkus.wav  •  Skipped by ${message.author.username}   ` })
                        .setColor(colors.blurple as ColorResolvable)
                        .setTimestamp();
                    return message.channel.send({ embeds: [main] });
                }
            
            } catch(err) {
                console.log(`  ❱❱ There was an error at ${__filename.split(/[\\/]/).pop()!}\n`, err);
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['s', 'n', 'next'],

        usage: "Skips the current track.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };