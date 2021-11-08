
    module.exports.run = async (client, message, args) => {
        
        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(message => {
                message.delete({ timeout: 1500 })});

        // grab the search prompt by connecting args together, with spaces in between
        const music = args.join(" ");
        
        //* if the user is in a voice channel?
        if (!message.member.guild.me.voice.channel) 
            return client.distube.play(message, music);
        
        // if the bot is in the same voice channel as the user
        else if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;

        if (message.deletable) message.delete();
        
        // passes the message and search prompt into the distube.play function
        client.distube.play(message, music);
    }

    module.exports.help = {
        name: "play",
        aliases: ['p'],
        description: "Plays a track, or adds it into the queue.",
        category: "music",
        status: "active"
    }