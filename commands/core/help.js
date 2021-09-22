
    const Discord = require('discord.js');
    const { prefix } = require('../../extensions/preferences.json');
    const { load } = require('../../resources/formats.json')

    // grabs the command list based on the filter (category)
    function get_cmds (client, filter) {
        var cmds = "";
        client.commands.forEach(cmd => {

            // if the filter does not match the given command
            if(cmd.help.category !== filter || cmd.help.status === "deprecated") return;

            // append the command name to a string
            cmds += `\`${prefix + cmd.help.name}\` `;
        });
        return cmds; 
    }

    module.exports.run = async (client, message, args) => {
        
        var cmd_arr = [], alpha_w = "";
        // push the commands and aliases into an array
        client.commands.forEach(cmd => {
            cmd_arr.push(cmd.help.name, ...cmd.help.aliases);
        })

        // if the input given is a valid command
        if (cmd_arr.includes(args[0])) {

            // help extension embed
            const hpex_embed = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Arkus Commands  •  Requested by ${message.author.username}.`)
            .setTimestamp()

            // loops through all the command names
            client.commands.forEach(cmd => {

                // if the command name is the same as args
                if (cmd.help.name === args[0] || cmd.help.aliases.includes(args[0])) {

                    if(cmd.help.status == "alpha") alpha_w = "[Alpha Only]";
                    
                    // extracts the description, name and aliases from cmd
                    hpex_embed.setTitle(`${prefix + cmd.help.name} ${alpha_w}`)
                        .setDescription(`> **${cmd.help.description}** \n> \`🤖\` Aliases: \`${(cmd.help.aliases).toString().replace(/,/g, '` `')}\``)
                }
            })
            return message.channel.send(hpex_embed);
        }

        // default help command
        const user = message.mentions.users.first() || message.author;
        const hpEmbed = new Discord.MessageEmbed ()  
            .setAuthor("Arkus Commands", load)
            .setDescription(`The prefix for this server is \`=\`. Note that all commands are experimental and only few work as of the moment.`)

            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Requested by ${message.author.username}.`, user.avatarURL())
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()

            .addFields(
                { name: "\`📌\` Admin", value: `${get_cmds(client, "admin")}`, inline: true},
                { name: "\`🤖\` Core", value: `${get_cmds(client, "core")}`, inline: true},
                { name: "\`💾\` Format", value: `${get_cmds(client, "layout")}`, inline: true},
                { name: "\`➕\` Mathematics", value: `${get_cmds(client, "math")}`, inline: true},
                { name: "\`📢\` Music", value: `${get_cmds(client, "music")}`, inline: true},
                { name: "\`🧷\` Miscellaneous", value: `${get_cmds(client, "misc")}`, inline: true},
            )
            .addField('\u200b', "Type =help 'command' to view the details of the command.")
        message.channel.send(hpEmbed);
    }

    module.exports.help = {
        name: "help",
        aliases: ['h', 'commands', 'cmd'],
        description: "Displays all the commands supported by the bot.",
        category: "core",
        status: "active"
    }