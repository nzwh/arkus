   
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

                }

                let timestamp : number = !isNaN(args[0]) ? Number(args[0]) : -1;            
                if (queue.songs[0].duration > timestamp && timestamp > 0) {

                    queue.seek(timestamp);
                    const main = new Discord.MessageEmbed()
                        .setDescription(`✦ Seeking to \`${timestamp}\` seconds...`)
                        .setColor(colors.blurple as ColorResolvable)
                        .setFooter({ text: `Arkus.wav  •  Requested by ${message.author.username}   ` })
                        .setTimestamp();
                    return message.channel.send({ embeds: [main] });

                } else {
                        
                    const warn = new Discord.MessageEmbed()
                        .setDescription("\`🏴\` ⟶ Invalid arguments.")
                        .setColor(colors.crimson as ColorResolvable);
                    return message.channel.send({ embeds: [warn] })
                        .then(message => { setTimeout(() => { message.delete() }, 5000) });
                }
            
            } catch(err) {
                console.log(`  ❱❱ There was an error at ${__filename.split(/[\\/]/).pop()!}\n`, err);
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['forward'],

        usage: "Seeks forward in seconds.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };