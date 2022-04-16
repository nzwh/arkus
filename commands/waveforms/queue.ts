   
    import Discord, { ColorResolvable, Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import { colors } from '../../databases/customs.json';
    import { Song } from 'distube';

    function GenerateEmbeds (tracks: Song[], current: Song) : Discord.MessageEmbed[] {

        let embeds = [];
        let max_page = Math.ceil(tracks.length / 10);
        for (let page_start = 0, cur_page = 1, page_limit = 10; page_start < tracks.length; page_start += 10, page_limit += 10, cur_page++) {

            let page = tracks.slice(page_start, page_limit), j = page_start;  
            let tracklist = '';

            for (const data of page) {

                let track_id = ('0' + (++j).toString()).slice(-2);
                let track_name = (data.name!.length) > 50 ? data.name!.substring(0, 49) + '...' : data.name;
                tracklist += `\`[${track_id}] ${data.formattedDuration}\`  [${track_name}](${data.url})\n`;
            }

            let current_id = ('0' + (tracks.indexOf(current) + 1).toString()).slice(-2);
            let current_name = (current.name!.length) > 50 ? current.name!.substring(0, 49) + '...' : current.name;
            let currents = `\`[${current_id}] ${current.formattedDuration}\`  [${current_name}](${current.url})`;

            const queue_embed = new Discord.MessageEmbed()
                .setFooter({ text: `Arkus.wav  •  ${cur_page} / ${max_page}  •  Track ${tracks.indexOf(current) + 1} of ${tracks.length}` })
                .setColor(colors.blurple as ColorResolvable)
                .setTimestamp()
                .addFields(
                    { name: '\`📢\` Now Playing:', value: currents },
                    { name: '\`🔻\` Upcoming:', value: tracklist });
            embeds.push(queue_embed);
        }

        return embeds;
    }

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
                }

                let merged_queue = [...queue.previousSongs, ...queue.songs];
                let current_page = Math.floor((merged_queue.indexOf(queue.songs[0]) + 1) / 10);
                
                const pagination = GenerateEmbeds(merged_queue, queue.songs[0]);
                const main = await message.channel.send({ embeds: [pagination[current_page]] });
            
                try {

                    await main.react("⬅️");
                    await main.react("➡️");

                } catch (err) {
                    console.log(`  ❱❱ There was an error when adding reactions.`);
                }
                
                const filter = (reaction: any, user: { id: string; }) => {
                    return ["⬅️", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
                };
                
                const collector = main.createReactionCollector({ filter, time: 60000 });
                collector.on("collect", async (reaction) => {

                    if (reaction.emoji.name === "➡️" && current_page < pagination.length - 1) {
                        current_page++;

                        main.edit({ embeds: [pagination[current_page]] });
                        reaction.users.remove(message.author.id);

                    } else if (reaction.emoji.name === "⬅️" && current_page !== 0) {
                        current_page--;

                        main.edit({ embeds: [pagination[current_page]] });
                        reaction.users.remove(message.author.id);
                    }
                });
                
            } catch(err) {
                console.log(`  ❱❱ There was an error at ${__filename.split(/[\\/]/).pop()!}\n`, err);
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['q', 'tracklist'],

        usage: "Displays the current queue of tracks.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };