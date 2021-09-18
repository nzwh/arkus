
    const Discord = require('discord.js');
    const { prefix } = require('../../preferences.json');

    module.exports.run = async (client, message, args) => {

        const user = message.mentions.users.first() || message.author;
        const hpEmbed = new Discord. MessageEmbed ()  
            .setAuthor("Arkus Commands", "https://cdn.discordapp.com/attachments/693499542850764870/885917793869004800/954b5761a1795b57fc05c2e262ae2fd2.gif")
            .setDescription(`The prefix for this server is \`=\`. Note that all commands are experimental and only few work as of the moment.`)

            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Requested by ${message.author.username}.`, user.avatarURL())
            .setThumbnail(message.guild.iconURL())

        const fs = require('fs');
        const c_master = fs.readdirSync('./commands/');
        for (let c_folder of c_master) {

            if(!(c_folder == "math")) {

                const c_files = fs.readdirSync(`./commands/${c_folder}`)
                    .filter(file => file.endsWith('.js'));

                for (const file of c_files){
                    const command = require(`../../commands/${c_folder}/${file}`);

                    var alias_arr = [];
                    command.help.aliases.forEach(alias => {
                        alias_arr += `, \`${prefix + alias}\` `
                    });
                    hpEmbed.addField(`\`${prefix + command.help.name}\`${alias_arr}`,`>     ✦ ${command.help.description}`);
                }
            }
        }

        message.channel.send(hpEmbed);
    }

    module.exports.help = {
        name: "help",
        aliases: ['h', 'commands', 'cmd'],
        description: "Displays all the commands supported by the bot."
    }