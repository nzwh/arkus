
    const Discord = require('discord.js');
    function generateQueueEmbed(message, queue) {
        let embeds = [];
        let k = 10;

        // get the maximum and current page number
        let maxPage = Math.ceil(queue.length / 10);
        let curPage = 0;

        // append all the tracks into a pagination loop
        for (let i = 0; i < queue.length; i += 10) {

            // declaration
            const current = queue.slice(i, k);
            let j = i;
            k += 10;        
            curPage++;
            
            // maps the song and id with a format
            const queues = current.map((song, id) => 
                `\`[${('0' + (++j).toString()).slice(-2)}] ${song.formattedDuration}\`  [${(song.name.length > 50) ? song.name.substr(0, 50-1) + '...' : song.name}](${song.url})`).join("\n");

            // formats the initial embed
            const queue_embed = new Discord.MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
                .setDescription(queues)
                .setFooter(`Arkus.wav  •  ${curPage} / ${maxPage}   `)
                .setTimestamp()
            embeds.push(queue_embed);
        }
        return embeds;
    }

    module.exports.run = async (client, message, args) => {

        try {
            //! permissions (can be deprecated)
            const permissions = message.channel.permissionsFor(message.client.user);
            if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
                return message.reply("No perms to message/add reacts");

            //? idk what this is yet
            let queue = await client.distube.getQueue(message);

            if (!queue) {

                // empty queue popup
                const no_embed = new Discord.MessageEmbed()
                    .setDescription("❗ No songs in queue.")
                    .setColor('#bf3939')
                message.channel.send(no_embed).then(r => {
                    r.delete({ timeout: 2000 })});
                return;
            }

            // generates the pagination embed
            let currentPage = 0;
            const embeds = generateQueueEmbed(message, queue.songs);

            if (embeds.length === 0) {

                // empty queue popup
                const no_embed = new Discord.MessageEmbed()
                    .setDescription("❗ No songs in queue.")
                    .setColor('#bf3939')
                message.channel.send(no_embed).then(r => {
                    r.delete({ timeout: 2000 })});
            }
            else {

                // sends the queue embed.
                const queueEmbed = await message.channel.send(embeds[currentPage]);
                
                // adds the reactions for pagination
                try {
                    await queueEmbed.react("⬅️");
                    await queueEmbed.react("➡️");
                } catch (err) {
                    console.log(err);
                }
                
                // filter to only read the user's reactions.
                const filter = (reaction, user) =>
                    ["⬅️", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
                
                // collects all the reactions
                const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
                collector.on("collect", async (reaction, user) => {
                    try {

                        // toggles the pages once reacted
                        if (reaction.emoji.name === "➡️" && currentPage < embeds.length - 1) {
                            currentPage++;
                            queueEmbed.edit(embeds[currentPage]);
                        } 
                        else if (reaction.emoji.name === "⬅️" && currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit(embeds[currentPage]);
                        }

                        // remove the ractions once finished
                        await reaction.users.remove(message.author.id);

                    } catch (err) {
                        console.log(err);
                        return message.channel.send(error.message).catch(console.error);
                    }
                });
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    module.exports.help = {
        name: "queue",
        aliases: ["q"],
        description: "Displays the current queue of tracks.",
        category: "music",
        status: "active"
    }