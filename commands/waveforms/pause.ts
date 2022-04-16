   
    import Discord, { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {
           
            try {
                
                const def_user = message.member?.voice?.channel;
                if (!def_user) return message.channel.send('> You must be in a voice channel to use this command.')
                    .then(message => { setTimeout(() => { message.delete() }, 5000) });
                
                let queue = client.distube.getQueue(message);
                if (!queue) {        

                    const no_embed = new Discord.MessageEmbed()
                        .setDescription("❗ No songs in queue.")
                        .setColor('#bf3939')
                    return message.channel.send({ embeds: [no_embed] })
                        .then(message => { setTimeout(() => { message.delete() }, 5000) });
                } else {
                    queue.pause();
                    message.react('⏸');
                }
            
            } catch(err) {
                console.log(`  ❱❱ There was an error at ${__filename.split(/[\\/]/).pop()!}\n`, err);
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['pa', 'wait'],

        usage: "Pauses the queue.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };