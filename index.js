const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NjkzMTAzMjU1MzQ5MjMxNjc3.Xn8e_A.TAWu2_-KzJoI5HInqZKOfdQ_H50';

console.log('');
const prefix = "=";

client.on('ready', ()=>{
    console.log('  ❱❱ Online.');
    client.user.setActivity(`with the clouds.`)
})

    const fs = require('fs');
    client.commands = new Discord.Collection();

    const command_f = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    if(command_f.length <= 0) console.log("  ❱❱ No commands to load.")

    console.log("  ❱❱ Loading commands...")
    try{
        for (const file of command_f){
            const command = require(`./commands/${file}`);
            client.commands.set(command.help.name, command);
        }
    } catch(err) {
        console.log(err)
    }

client.on('message', async message=>{

    const args = message.content.substring(prefix.length).split(" ")

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    
    let cmd = client.commands.get(args[0]);
    if(cmd) cmd.run(client, message, args.slice(1));
    
})

client.login(token);