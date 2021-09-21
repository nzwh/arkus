    
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {

        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(r => {
                r.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;

        //? idk what this is yet
        let queue = await client.distube.getQueue(message);
        if(queue) {

            // extract the current track from queue
            let current_track = queue.songs[0];

            // skip song popup
            const skip_embed = new Discord.MessageEmbed()
                .setDescription(`✦ Skipped ${(current_track.name.length > 60) ? current_track.name.substr(0, 60-1) + '...' : current_track.name}}.`)
                .setColor(message.guild.me.displayHexColor)
                .setFooter(`Arkus.wav  •  Skipped by ${message.author.username}   `)
                .setTimestamp()
            message.channel.send(skip_embed);

            //? idk what this is yet
            return queue.dispatcher.end();
        }

        else if (!queue) {        
            
            // empty queue popup
            const skip_embed = new Discord.MessageEmbed()
                .setDescription("❗ No songs in queue.")
                .setColor('#bf3939')
            message.channel.send(skip_embed).then(r => {
                r.delete({ timeout: 2000 })});
        }
    }

    module.exports.help = {
        name: "skip",
        aliases: ['n', 'next']
    }