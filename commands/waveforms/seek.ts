   
    import Discord, { ColorResolvable, Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import { colors } from '../../databases/customs.json';

    function Splitter(str: string) : number[] {

        if (!isNaN(Number(str.replace(/ /g, '')))) 
            return str.split(' ').map(Number);
        
        str = str.replace(/ /g, '');
        if (str.match(/^[0-9:]+$/))
            return str.split(':').filter(n => n).map(Number);

        if (str.match(/^[0-9,]+$/))
            return str.split(',').filter(n => n).map(Number);

        if (str.match(/^[0-9hms]+$/))
            return str.replace(/[hms]/g, ' ')
                .split(' ').filter(n => n).map(Number);

        return [-1];
    }

    function ToSeconds(arr: number[]): number {

        let seconds = arr.reduce((acc,time) => (60 * acc) + +time);
        return seconds;
    }

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {
           
            try {

                const b_channel = message.guild?.me?.voice.channel;
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

                } else if (u_channel === b_channel) {
                    
                    let track_length  = queue.songs[0].duration;
                    let current_time  = Math.round(queue.currentTime);
                    let timestamp = current_time;

                    if (args[0] && !isNaN(args[1])) {

                        if (["forward", "f"].includes(args[0])) {
                            
                            if (current_time + Number(args[1]) > track_length) 
                                return message.channel.send('> You cannot seek forward past the end of the track.');
                            timestamp = current_time + Number(args[1]);
                            
                        } else if (["backward", "b"].includes(args[0])) {
                                
                            if (current_time - Number(args[1]) < 0) 
                                return message.channel.send('> You cannot seek backward past the beginning of the track.')
                            timestamp = current_time - Number(args[1]);
                        } 

                    } else if (["start", 's'].includes(args[0].toLowerCase())) {
                        
                        timestamp = 1;

                    } else if (["middle", "m"].includes(args[0].toLowerCase())) {

                        timestamp = Math.round(track_length / 2);
                    
                    } else {

                        if (!isNaN(args[0]) && args.length == 1) {

                            timestamp = args[0];
                        
                        } else {

                            let content = message.content;
                            content = content.substring(content.indexOf(' ') + 1).replace(/\s+/g, '');

                            let arr = Splitter(content);
                            if (arr[0] === -1) 
                                return message.channel.send('> Invalid input.');
                            if (arr[0] > track_length) 
                                return message.channel.send('> You cannot seek forward past the end of the track.');
                            if (arr[0] < 0) 
                                return message.channel.send('> You cannot seek backward past the beginning of the track.');

                            timestamp = ToSeconds(arr);
                        }
                    }

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