
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        // extracts text from help.json
        const { avatar, flip, help, invite, math, ping, talk } = require('../files/help.json')
        const user = message.mentions.users.first() || message.author;

        const hpEmbed = new Discord. MessageEmbed ()  
            .setAuthor("Arkus Commands", "https://cdn.discordapp.com/attachments/693499542850764870/885917793869004800/954b5761a1795b57fc05c2e262ae2fd2.gif")
            .setDescription(`The prefix for this server is \`=\`. Note that all commands are experimental and only few work as of the moment.`)
            .addField("Basic Commands", `${avatar}\n\n${flip}\n\n${help}\n\n${invite}\n\n${math}\n\n${ping}\n\n${talk}`)

            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Requested by ${message.author.username}.`, user.avatarURL())
            .setThumbnail(message.guild.iconURL())

        message.channel.send(hpEmbed);
    }

    module.exports.help = {
        name: "help",
        aliases: ['h']
    }