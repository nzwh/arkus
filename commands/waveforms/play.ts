   
    import Discord, { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            try {
                const prompt = args.join(" ");
                // const guild_user = message.member?.guild.me?.voice.channel;

                const u_channel = message.member?.voice?.channel;
                if (!u_channel) return message.channel.send('> You must be in a voice channel to use this command.')
                    .then(message => { setTimeout(() => { message.delete() }, 5000) });

                else {
                    client.distube.play(u_channel, prompt, {
                        member: message.member,
                        textChannel: (message.channel as Discord.TextChannel),
                    message });
                }

            } catch(err) {
                console.log(`  ❱❱ There was an error at ${__filename.split(/[\\/]/).pop()!}\n`, err);
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['p'],

        usage: "Plays a track, or adds it to the current queue.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };