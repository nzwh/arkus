
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
        if (queue) {  

            // parses the repeatMode into a string
            var repeatMode;
            if(queue.repeatMode === 0) repeatMode = "off";
            if(queue.repeatMode === 1) repeatMode = "track";
            if(queue.repeatMode === 2) repeatMode = "queue";

            // formats columns for the embed
            var status_a = `\`🤖\` **Autoplay:** \`${queue.autoplay}\` \n\n`;
            status_a += `\`💽\` **Elapsed:** \`${queue.formattedCurrentTime}\` \n\n`;
            status_a += `\`📢\` **Playing:** \`${queue.playing}\` \n\n`;

            var status_b = `\`🔊\` **Volume:** \`${queue.volume}\` \n\n`;
            status_b += `\`🔄\` **Looping:** \`${repeatMode}\` \n\n`;
            status_b += `\`📼\` **Filter:** \`${queue.filter}\``;
            
            // formats the final embed
            const current_track = queue.songs[0];
            const status_embed = new Discord.MessageEmbed()
                .setAuthor("Arkus.wav Now Playing: Statistics")
                .setColor(message.guild.me.displayHexColor)

                .addField('\u200b', status_a, true)
                .addField('\u200b', status_b, true)
                .addField('\u200b', `\`📣\`**Now Playing:** [${(current_track.name.length > 40) ? current_track.name.substr(0, 40-1) + '...' : current_track.name}](${current_track.url})`, false)

                .setFooter(`Arkus.wav  •  Requested by ${message.author.username}   `)
                .setTimestamp()
            message.channel.send(status_embed); 
        }
    }
    
    module.exports.help = {
        name: "status",
        aliases: []
    }