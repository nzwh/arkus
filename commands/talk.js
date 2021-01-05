
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        if (message.author.id == "170501385954131968")  {
        if (message.deletable) message.delete()
            var msg_ = message.content.slice(5)
            if (args[1] == "/m") {
                const sayEmbed = new Discord.MessageEmbed()
                    .setTitle(msg_.slice(args[1].length+1))
                    .setColor("#fafafa")
                message.channel.send(sayEmbed)
            }
            else
                message.channel.send(msg_)
        }
    }

    module.exports.help = {
        name: "talk"
    }
