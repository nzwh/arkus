
    const Discord = require('discord.js')
    module.exports.run = async (client, message, args) => {
        
        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(message => {
                message.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;
    
        try {
            //? idk what this is yet
            let mode = client.distube.toggleAutoplay(message);

            // autoplay popup
            const auto_embed = new Discord.MessageEmbed()
                .setDescription(`✦ Autoplay now set to **\`${(mode ? "on" : "off")}\`.`)
                .setColor(message.guild.me.displayHexColor)
            message.channel.send(auto_embed);

        } catch {
            
            // no tracks popup
            const notracks_embed = new Discord.MessageEmbed()
                .setDescription("✦ The bot isn't playing anything currently.")
                .setColor('#bf3939')
            message.channel.send(notracks_embed);
        }
    }
    
    module.exports.help = {
        name: "autoplay",
        aliases: ['ap'],
        description: "Autoplays recommended tracks once the queue is completed.",
        category: "music",
        status: "active"
    }