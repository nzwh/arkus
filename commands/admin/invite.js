
    const Discord = require('discord.js');
    module.exports.run = async (client, message, args) => {
        
        if (message.author.id == "170501385954131968" || "745494363198718022")  {
            const invEmbed = new Discord.MessageEmbed()
                .setTitle("Invite Link:")
                .setDescription("> ` Use this link to invite this bot to your server! `\n > ` ❱❱ Invite Link: ` **[Arkus Invite](https://discordapp.com/oauth2/authorize?client_id=693103255349231677&scope=bot&permissions=8)**")
                .setColor("#fafafa")
            message.channel.send(invEmbed)
            }
        else
            message.channel.send("Sorry, the invite link is unavailable.")
    }

    module.exports.help = {
        name: "invite",
        aliases: ['inv', 'link'],
        description: "Provides an invite link to the bot.",
        category: "admin",
        status: "alpha"
    }
