        
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {

        return;
        
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

        try {
            //? idk what this is yet
            if (queue.dispatcher) queue.dispatcher.end();

            // gets the index of the track
            let track_n = parseInt(args[0]);
            let prev_tracks = queue.songs.slice(0, track_n-2);
            await prev_tracks.forEach(song => {
                queue.songs.push(song);
            });

            // removes the track
            queue.songs.splice(0, track_n-2);
            return queue.songs;

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
        name: "jumpd",
        aliases: [],
        description: "Jumps to a song in a queue.",
        category: "music",
        status: "deprecated"
    }

    var moveInArray = function (arr, from, to) {

        // Delete the item from it's current position
        var item = arr.splice(from, 1);

        // Move the item to its new position
        arr.splice(to, 0, item[0]);

    };