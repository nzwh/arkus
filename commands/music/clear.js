
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

        // clears the queue
        if (queue.dispatcher) queue.dispatcher.end();
        queue.songs.splice(0, queue.songs.length);

        // reacts 👍🏻 once queue is cleared
        message.react('👍');
    }
    
    module.exports.help = {
        name: "clear",
        aliases: ['clr'],
        description: "Clears all the tracks in the queue.",
        category: "music",
        status: "active"
    }