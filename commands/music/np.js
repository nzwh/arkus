
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(message => {
                message.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;
        
        //? idk what this is yet
        let queue = await client.distube.getQueue(message);
        if (!queue) {        

            // empty queue popup
            const skip_embed = new Discord.MessageEmbed()
                .setDescription("❗ No songs in queue.")
                .setColor('#bf3939')
            message.channel.send(skip_embed).then(r => {
                r.delete({ timeout: 2000 })});
        }

        // extract the current track from queue
        let current_track = queue.songs[0];

        // progress bar implementation
        var timestamp = Math.round(((queue.currentTime/1000)/queue.duration)*50);
        var progress_bar = "────────────────────────────────────────────────";

        // now playing
        var play_card = `[<@${current_track.user.id}>]  [${(current_track.name.length > 60) ? current_track.name.substr(0, 60-1) + '...' : current_track.name}](${current_track.url}) \n\n`;
        play_card += `\`${progress_bar.slice(0, timestamp)}🔹${progress_bar.slice(timestamp)} ${queue.formattedCurrentTime} / ${current_track.formattedDuration}\` `;
        
        // now playing popup
        const np_embed = new Discord.MessageEmbed()
            .setDescription(play_card)
            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Arkus.wav  •  Requested by ${message.author.username}   `)
            .setTimestamp()
        message.channel.send(np_embed);
        
    }
    
    module.exports.help = {
        name: "np",
        aliases: ['nowplaying']
    }