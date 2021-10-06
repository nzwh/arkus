
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {

        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
        return message.channel.send('> You must be in a voice channel to use this command.').then(message => {
            message.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;
            
        // if there are no arguments given, return a list
        if (!args[0])
            return message.channel.send('> Available Filters: `3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `reverse`, `haas`, `tremolo`, `earwax`, `phaser`, `surround`, `mcompand`');
            
        try {
            // if any of the filters includes the arguments
            if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `reverse`, `haas`, `tremolo`, `earwax`, `phaser`, `surround`, `mcompand`].includes(args[0])) {

                // sets the filter from arguments[0]
                let filter = client.distube.setFilter(message, args[0]);
                
                // apply filter popup
                const apply_embed = new Discord.MessageEmbed()
                    .setDescription("✦ Filter set to `" + (filter || "Off") + '`')
                    .setColor(message.guild.me.displayHexColor)
                    .setFooter(`Arkus.wav  •  Applied by ${message.author.username}   `)
                    .setTimestamp()
                message.channel.send(apply_embed);
            } 
        } catch {

            // error popup
            const error_embed = new Discord.MessageEmbed()
                    .setDescription("✦ Invalid filter.")
                    .setColor('#bf3939')
            message.channel.send(error_embed).then(r => {
                r.delete({ timeout: 3000 })});;
        }
    }
    
    module.exports.help = {
        name: "filter",
        aliases: ['filters'],
        description: "Adds a sound filter on top of the track.",
        category: "music",
        status: "deprecated"
    }