
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
        if (!queue) {        

            // empty queue popup
            const skip_embed = new Discord.MessageEmbed()
                .setDescription("❗ No songs in queue.")
                .setColor('#bf3939')
            message.channel.send(skip_embed).then(r => {
                r.delete({ timeout: 2000 })});
        }

        try {
            
            // remove song popup
            let song = queue.songs[parseInt(args[0])-1];
            const track_embed = new Discord.MessageEmbed()
                .setDescription(`✦ Removed track [${song.name}](${song.url})`)
                .setColor('#bf3939')
                .setFooter(`Arkus.wav  •  Removed by ${message.author.username}   `)
                .setTimestamp()
            message.channel.send(track_embed);

            // removes the song from the queue
            queue.songs.splice(parseInt(args[0])-1, 1);
            if (parseInt(args[0]) === 1) {
                //! return client.distube.seek(message, song.duration * 1000);
                return queue.dispatcher.end();
            }
        } catch(err) {

            // error popup
            const error_embed = new Discord.MessageEmbed()
                .setDescription("✦ Invalid input.")
                .setColor('#bf3939')
            message.channel.send(error_embed).then(r => {
                r.delete({ timeout: 3000 })});

            console.log(err);
        }
    }
    
    module.exports.help = {
        name: "remove",
        aliases: []
    }