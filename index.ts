
    import Discord from 'discord.js';
    import SuperClient from './extensions/super_client';
    const { prefix } = require('./extensions/preferences.json');

    require('dotenv').config();
    console.log('\n');

    const client = new SuperClient();
    client.once('ready', () => {

        console.log('\n  ❱❱ Online. \n');
        client.user!.setPresence({ activities: [{
            name: 'with the clouds',
            type: 'STREAMING',
            url: "https://www.twitch.tv/monstercat"
        }], status: 'dnd' });
    });

    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.categories = [];

    const handler = require('./extensions/command_handler');
    handler.default(client);

    client.on('messageCreate', async (message) => {

        if ((message.content.split(' '))[0] === `<@${client.user!.id}>`) 
            message.channel.send(`> Hello, my prefix is \`"${prefix}"\`.`);
        if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) 
            return;
        
        const args = message.content.substring(prefix.length).split(" ");
        const cmd = client.commands.get(args[0].toLowerCase()) 
            || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (cmd) cmd.default.run(client, message, args.slice(1));
    });

    client.login(process.env.TOKEN); 