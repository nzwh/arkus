
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        // obtains the first user mentioned in the message, 
        // or if non, obtains the author of the message
        const user = message.mentions.users.first() || message.author;

            // creates a new discord embed
            const avEmbed = new Discord.MessageEmbed()
                .setTitle("Avatar:")
                .setImage(user.avatarURL())
                .setFooter(`Requested by ${message.author.username}.`, user.avatarURL())
                .setColor("#8398ff")

            // sends the message to the channel
            message.channel.send(avEmbed)
    }

    module.exports.help = {
        name: "avatar",
        aliases: ['av']
    }
