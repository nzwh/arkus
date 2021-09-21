   
    const Discord = require('discord.js');
    const { prefix } = require("../../extensions/preferences.json");
    module.exports.run = async (client, message, args) => {

        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(message => {
                message.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;
        
        let queue = await client.distube.getQueue(message);
        if (!queue) {        

            // empty queue popup
            const skip_embed = new Discord.MessageEmbed()
                .setDescription("❗ No songs in queue.")
                .setColor('#bf3939')
            message.channel.send(skip_embed).then(r => {
                r.delete({ timeout: 2000 })});
        }

        // listens to only the valid args
        if ([`off`, `track`, `queue`].includes(args[0])) {
            let type = args[0].toLowerCase();
            
            // switches the repeatMode based on args[0]
            switch(type) {
                case "off":
                    await client.distube.setRepeatMode(message, 0);
                    break;
                case "track":
                    await client.distube.setRepeatMode(message, 1);
                    break;
                case "queue":
                    await client.distube.setRepeatMode(message, 2);
                    break;
            }
            // loop message popup
            const loop_embed = new Discord.MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
                .setDescription(`✦ Looping \`${type}\`.`)
            message.channel.send(loop_embed);
        } 
        else
            // wrong usage popup
            message.channel.send(`> Make sure you typed the command correctly: ${prefix}loop \`off\` | \`queue\` | \`track\``).then(r => {
                r.delete({ timeout: 3000 })});;;
    }

    module.exports.help = {
        name: "loop",
        aliases: ['l'],
        description: "Loops by track, queue, or none",
        category: "music",
        status: "active"
    }