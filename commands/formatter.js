    
    const Discord = require('discord.js');
    const { load } = require('../files/color.json')

    function isInclude(d_msg) {
        if (d_msg == "na") return false;
        else true;
    }

    module.exports.run = async (client, message, args) => {
        
        // checks if the user has the Tester role
        if (!(message.member.roles.cache.some(role => role.name === 'Tester'))) return;
        if (message.deletable) message.delete();

        // filters out the messages to only the author
        const filter = msg => msg.author.id == message.author.id;
        var type = "", ctr = 0;
        
        // sends an embed about the formatter and deletes after 30000ms (30s)
        const st_embed = new Discord.MessageEmbed()
            .setAuthor("❱❱  Formatter 1.0", client.user.displayAvatarURL())
            .setDescription("**Welcome to the Formatter 1.0.** This will create a new formatted embed of your choice. The formatter will continue to listen for input until all fields have been answered. If you would like to disregard a certain field, type 'na'. This formatter will end after **three minutes**..")

            .setFooter("Arkus Formatting", load)
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()
            .setColor(message.guild.me.displayHexColor)

        // wait until the entire process is finished to delete the embed
        message.channel.send(st_embed).then(st_msg => {

            var in_arr = ["Title", "Title URL", "Author", "Author Icon", "Description", "Color", "Thumbnail", "Image", "Footer", "Footer Icon", "Timestamp"]

            const in_embed = new Discord.MessageEmbed()
                .setDescription(`\`\`\`📢   Enter your desired ${in_arr[ctr]}. [Type 'na' to disregard.]\`\`\``)
                .setColor(message.guild.me.displayHexColor)
            message.channel.send(in_embed).then(in_msg => {

                    // collects all the messages sent and modifies them for the role section
                    const collector = new Discord.MessageCollector(message.channel, filter, { max:11, time: 180*1000 });
                    collector.on('collect', m => {

                        if(m.deletable) m.delete();
                        type += m.content + "\n";
                        ctr++;
                        
                        const in_embed_edit = new Discord.MessageEmbed()
                            .setColor(message.guild.me.displayHexColor)

                        if(ctr < 11)
                            in_embed_edit.setDescription(`\`\`\`📢   Enter your desired ${in_arr[ctr]}. [Type 'na' to disregard.]\`\`\``)
                        else 
                            in_embed_edit.setDescription(`\`\`\`📢   Inputs Complete.\`\`\``)
                        
                        in_msg.edit(in_embed_edit);
                    });

                    // once the collector finished collecting messages
                    collector.on('end', collected => {

                        // creates a new embed, and then splits type into an array
                        const fn_embed = new Discord.MessageEmbed();
                        type_arr = type.split("\n");

                        // title
                        if (type_arr[in_arr.indexOf("Title")] != "na") {

                            // title url
                            if (type_arr[in_arr.indexOf("Title URL")] != "na") 
                                var type_title_url = type_arr[in_arr.indexOf("Title URL")];
                            // title push
                            if (type_title_url == undefined) fn_embed.setTitle(type_arr[in_arr.indexOf("Title")]);
                            else fn_embed.setTitle(type_arr[in_arr.indexOf("Title")], type_title_url);
                        }

                        // author filter
                        if (type_arr[in_arr.indexOf("Author")] != "na") {

                            // author icon filter
                            if (type_arr[in_arr.indexOf("Author Icon")] != "na") 
                                var type_auth_icon = type_arr[in_arr.indexOf("Author Icon")];
                            // author push filter
                            if (type_auth_icon == undefined) fn_embed.setAuthor(type_arr[in_arr.indexOf("Author")]);
                            else fn_embed.setAuthor(type_arr[in_arr.indexOf("Author")], type_auth_icon);
                        }

                        // description filter
                        if (type_arr[in_arr.indexOf("Description")] != "na")
                            fn_embed.setDescription(type_arr[in_arr.indexOf("Description")]);
                            
                        // color filter
                        var type_color = message.guild.me.displayHexColor;
                        if (type_arr[in_arr.indexOf("Color")] != "na") type_color = type_arr[in_arr.indexOf("Color")]
                            fn_embed.setColor(type_color);

                        // thumbnail filter
                        if (type_arr[in_arr.indexOf("Thumbnail")] != "na") 
                            fn_embed.setThumbnail(type_arr[in_arr.indexOf("Thumbnail")]);

                        // image filter
                        if (type_arr[in_arr.indexOf("Image")] != "na") 
                            fn_embed.setImage(type_arr[in_arr.indexOf("Image")]);

                        // footer filter
                        if (type_arr[in_arr.indexOf("Footer")] != "na") {

                            // footer icon filter
                            if (type_arr[in_arr.indexOf("Footer Icon")] != "na") 
                                var type_footer_icon = type_arr[in_arr.indexOf("Footer Icon")];
                            // footer push filter
                            if (type_footer_icon == undefined) fn_embed.setFooter(type_arr[in_arr.indexOf("Footer")]);
                            else fn_embed.setFooter(type_arr[in_arr.indexOf("Footer")], type_footer_icon);
                        }

                        // timestamp filter
                        if (type_arr[in_arr.indexOf("Timestamp")] == "yes") 
                            fn_embed.setTimestamp();


                        // sends the embed, and then deletes starting embed and input embed
                        message.channel.send(fn_embed);
                        st_msg.delete();
                        in_msg.delete();
                        
                    });
                
            });
        });
    }

    module.exports.help = {
        name: "formatter",
        aliases: ['fm']
    }

