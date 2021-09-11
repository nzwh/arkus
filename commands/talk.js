
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        // checks if the user is permitted to use the command
        if (message.member.roles.cache.some(role => role.name === 'Tester'))  {

        if (message.deletable) message.delete()
        var t = message.content;

        // cuts off the command and leaves the message (with /m)
        var msg_ = t.substring(t.indexOf('/')+2);
        if (args[0] == "/m" && msg_ != "") {
            const sayEmbed = new Discord.MessageEmbed()
                .setDescription(`**${msg_}**`)
                .setColor("#2F3136")
            message.channel.send(sayEmbed)
        }

        // cuts off the command and leaves the message
        else if (args[0] != undefined && msg_ != "") message.channel.send(t.substring(t.indexOf(' ')))
        }
    }

    module.exports.help = {
        name: "talk",
        aliases: ['t']
    }
