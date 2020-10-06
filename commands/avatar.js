
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        const user = message.mentions.users.first() || message.author;
            const avEmbed = new Discord.MessageEmbed()
                .setTitle("Avatar:")
                .setImage(user.avatarURL())
                .setFooter(`Requested by ${message.author.username}.`, user.avatarURL())
                .setColor("#8398ff")
            message.channel.send(avEmbed)
    }

    module.exports.help = {
        name: "avatar"
    }
