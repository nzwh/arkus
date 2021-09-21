
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        // if the user is not in a voice channel
        if (!message.member.voice.channel) 
            return message.channel.send('> You must be in a voice channel to use this command.').then(r => {
                r.delete({ timeout: 1500 })});

        // if the bot is in the same voice channel as the user
        if (message.member.voice.channel && message.member.voice.channel !== message.member.guild.me.voice.channel) 
            return;

        // if invalid input, return
        if (!parseInt(args[0])) return;
    
        if (parseInt(args[0]) <= 100 && parseInt(args[0]) >= 0) {
            
            // volume embed popup
            const volume_embed = new Discord.MessageEmbed()
                .setDescription(`✦ Volume now set to \`${args[0]}\`.`)
                .setColor(message.guild.me.displayHexColor)
                .setFooter(`Arkus.wav  •  Modified by ${message.author.username}   `)
                .setTimestamp()
            message.channel.send(volume_embed);

            // sets the volume with args[0]
            client.distube.setVolume(message, args[0]);
        } 
        else {

            // error popup
            const error_embed = new Discord.MessageEmbed()
                .setDescription("✦ Invalid input.")
                .setColor('#bf3939')
            message.channel.send(error_embed).then(r => {
                r.delete({ timeout: 3000 })});
        }
    }
    
    module.exports.help = {
        name: "volume",
        aliases: ['vol'],
        description: "Controls the volume of the track.",
        category: "music",
        status: "active"
    }