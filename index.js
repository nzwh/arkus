
const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NjkzMTAzMjU1MzQ5MjMxNjc3.Xn8e_A.TAWu2_-KzJoI5HInqZKOfdQ_H50';

const prefix = "=";

client.on('ready', ()=>{
    console.log('\n  ❱❱ Online.');
    client.user.setActivity(`with the clouds`)
})

client.on('message', async message=>{

    const args = message.content.substring(prefix.length).split(" ")

    if (message.content == "owo") message.channel.send("uwu")
    if (message.content == "arkus") message.channel.send("hi im a bot and also stupid")

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const path = "C:\\Users/Nav/Desktop/   /bots/Arkus";

    switch(args[0]){

        case "ping":
            const msg = await message.channel.send('🎮 pinging...');
            msg.edit(`🎮 pong!~  |  🏳️ latency: **${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms**`);
            break;
        
        case "avatar":  
            const user = message.mentions.users.first() || message.author;
            const avEmbed = new Discord.MessageEmbed()
                .setTitle("Avatar:")
                .setImage(user.avatarURL())
                .setFooter(`Requested by ${message.author.username}.`, user.avatarURL())
                .setColor("#8398ff")
            message.channel.send(avEmbed)
            break;

        case "invite":
            if (message.author.id == "170501385954131968")  {
                const invEmbed = new Discord.MessageEmbed()
                    .setTitle("Invite Link:")
                    .setDescription("> ` Use this link to invite this bot to your server! `\n > ` ❱❱ Invite Link: ` **[Arkus Invite](https://discordapp.com/oauth2/authorize?client_id=693103255349231677&scope=bot&permissions=8)**")
                    .setColor("#fafafa")
                message.channel.send            (invEmbed)
            }
            else
                message.channel.send("Sorry, the invite link is unavailable.")
            break;
        
        case "talk":
            if (message.deletable) message.delete()
            var msg_ = message.content.slice(args[0].length+1)
            if (args[1] == "mb") {
                const sayEmbed = new Discord.MessageEmbed()
                    .setTitle(msg_.slice(args[1].length+1))
                    .setColor("#fafafa")
                message.channel.send(sayEmbed)
            }
            else
                message.channel.send(msg_)
            break;

        case "help":
            var data = require('fs').readFileSync(`${path}/archives/help.txt`).toString()
            message.channel.send(data)
            break;

        case "format":
            if (message.author.id == "170501385954131968")  {
                if (message.deletable) message.delete()
                try {
                    var file_ = `${path}/CC001/CH/${message.content.slice(args[0].length+2)}.txt`
                    var data = require('fs').readFileSync(file_).toString().split("\n");
                    for (i = 0; i<data.length; i++) data[i] = data[i].substring(data[i].indexOf(":")+1)

                    try {
                        var code = `${path}/CC001/CODE/${message.content.slice(args[0].length+2)} A.txt`
                        var code_ = require('fs').readFileSync(code).toString()
                    } catch {
                        console.log("  ❱❱ Format file does not exist.") }

                    const ccEmbed = new Discord.MessageEmbed()
                        .setTitle(data[0]).setDescription(data[1])
                        .addFields(
                            { name: '**Constraints:**',     value: `\n ${data[3]}` },
                            { name: '**Example:**',   value: `\n ${data[4]}` },
                            { name: '**Format:**', value: `\n ${code_}` },
                            { name: '**Deadline:**',        value: `\n ${data[5]}` }
                        )
                        .setColor(data[2]).setFooter(data[6])
                        .setThumbnail("https://i.imgur.com/zUlXRHd.png")
                    message.channel.send(ccEmbed)
                } catch { 
                    message.channel.send("File does not exist.")
                    console.log("  ❱❱ File does not exist.") }
                    
            }
            break;
        }
})

client.login(token);