const { Client, Collection, Intents } = require('discord.js');
//const { token } = require('./config.json');

const prefix = "=";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
console.log('');

// event set prescence
client.on('ready', ()=>{

    console.log('\n  ❱❱ Online.');
    client.user.setActivity("with the clouds", {
        type: "STREAMING",
        url: "https://www.twitch.tv/monstercat"
      });
});

    const fs = require('fs');
    client.commands = new Collection();
    client.aliases = new Collection();

    // creates an array that will contain all the foldernames inside ./commands/
    const c_master = fs.readdirSync('./commands/')
    // loops through all the foldernames inside the c_master array
    for(let c_folder of c_master) {

        // creates an array that will contain all the filenames.js inside ./commands/c_folder/
        const c_files = fs.readdirSync(`./commands/${c_folder}`)
            .filter(file => file.endsWith('.js'));

        // (optional), if there are no filenames.js inside ./commands/c_folder/, log to console
        if(c_files.length <= 0) console.log(`  ❱❱ No ${c_folder} commands to load.`)
        console.log(`  ❱❱ Loading ${c_folder} commands...`)

        try {
            // loops through all files in c_files
            for (const file of c_files){

                // require the actual file by using a path involving c_folder and files inside c_files
                const command = require(`./commands/${c_folder}/${file}`);
                // set the command to the client, given the command name (in module.exports), and the actual file
                client.commands.set(command.help.name, command);

                // loops through all the aliases (in module.exports) and sets them with the command name
                command.help.aliases.forEach(alias => {
                    client.aliases.set(alias, command.help.name);
                });
            }
        } catch(err) {
            console.log("  ❱❱ There was a problem in setting commands.\n\n", err);
        }
    }

client.on('message', async message=>{

    const args = message.content.substring(prefix.length).split(" ")

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    
    let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    if(cmd) cmd.run(client, message, args.slice(1));
    
});

//client.login(token)
client.login(process.env.TOKEN);