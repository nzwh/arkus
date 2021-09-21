
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {

        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(r => {
                r.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;
        
        let queue = await client.distube.getQueue(message);

        if(queue) {
            // stops the bot and removes it from the channel.
            client.distube.stop(message);
            return message.react('👋');
        } 
        else if (!queue) 
            return;
    }
    
    module.exports.help = {
        name: "leave",
        aliases: ['dc', 'die']
    }