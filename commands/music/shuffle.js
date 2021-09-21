
    module.exports.run = async (client, message, args) => {
        
        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(r => {
                r.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;
        
        // shuffles the queue and leaves a reaction
        client.distube.shuffle(message);
        message.react('🔀');
    }
    
    module.exports.help = {
        name: "shuffle",
        aliases: ['sh']
    }