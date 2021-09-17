
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        // obtains the first user mentioned in the message, 
        // or if non, obtains the author of the message
        const user = message.mentions.users.first() || message.author;

            // creates a new discord embed
            const avEmbed = new Discord.MessageEmbed()
                .setTitle("Requested Avatar:")
                .setImage(user.avatarURL({ format: 'png', size: 1024 }))
                .setFooter(`Requested by ${message.author.username}.`, message.author.avatarURL())
                .setColor(message.guild.me.displayHexColor)

            // sends the message to the channel
            message.channel.send(avEmbed)
    }

    module.exports.help = {
        name: "avatar",
        aliases: ['av', 'pfp', 'img'],
        description: "Returns the avatar of a user mentioned, or yourself."
    }
