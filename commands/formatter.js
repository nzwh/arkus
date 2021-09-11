    
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        message.channel.send("Currently unavailable.")
        return;
        
        // filters out the messages to only the author
        const filter = msg => msg.author.id == message.author.id;

        // sends an embed and deletes after 30000ms (30s)
        const aufmEmbed = new Discord.MessageEmbed()
            .setAuthor("Autoembedder 1.0", "https://cdn.discordapp.com/attachments/693499542850764870/885917793869004800/954b5761a1795b57fc05c2e262ae2fd2.gif")
            .setDescription("This will create a new embed of your liking. This popup will disappear after 30s of inactivity.")

            .addField("Enter your .setAuthor value.")

            .setThumbnail(message.guild.iconURL())
            .setColor(message.guild.me.displayHexColor)
        message.channel.send(aufmEmbed).then(r => r.delete({timeout: 30000}));

        // waits for a message to be sent, and then when collected, executes
        message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {

            // grabs only the first message with the filter
            var m_author = collected.first().content;

            // if message is "cancel", process will stop
            if(m_author == "cancel") return message.channel.send("Action cancelled.");
            if(m_author == "skip") return;
            
            
        }).catch(err => {
            console.log(err);
        })

        const fnEmbed = new Discord.MessageEmbed()
            .setAuthor()
            .setDescription()

            .addField()

            .setThumbnail()
            .setColor()
        message.channel.send(fnEmbed)
    }

    module.exports.help = {
        name: "formatter",
        aliases: ['fm']
    }

