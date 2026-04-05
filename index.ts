import { ActivityType, Embed, EmbedBuilder, Events } from 'discord.js';
import SuperClient from './src/extensions/super-client.ts';
import AsyncHandler from './src/extensions/async-handler.ts';
import { config } from 'dotenv';

import { LoadCommands } from './src/events/load-commands.ts';

// init: dotenv, prefix configuration
config() && console.info('\n');
const prefix = process.env.PREFIX || '-';

// init: client object
const client = new SuperClient();
    await LoadCommands(client);

// listener: for when the client is ready
client.once(Events.ClientReady, () => {
    // set the bot status and log to console
    console.info(`\n [💫] Online in ${client.guilds.cache.size} servers.`);
    client.user?.setPresence({ activities: [{
        name: 'https://arkus.macro ・ -help',
        type: ActivityType.Custom
    }], status: 'dnd' });
});

// listener: for all messages (with async error handling)
client.on(Events.MessageCreate, AsyncHandler(async (message) => {
    // ignore if the message is from a bot or not in a guild
    if (message.author.bot || !message.guild)
        return;

    // parse the message content to lowercase
    const messageContent = message.content.toLowerCase();
    // if the bot is mentioned, reply with the prefix
    if ((messageContent.split(' '))[0] === `<@${client.user?.id}>`) {
        message.reply({
            embeds: [new EmbedBuilder().setDescription(`**\`👋\` Hello! My prefix is \`${prefix}\`.**`)]
        });
        return;
    }

    // ignore if it does not start with the prefix or is too short
    if (!messageContent.startsWith(prefix) || messageContent.length <= 1) 
        return;
    
    // parse the arguments as an array, splitting on one or more spaces
    const args = messageContent.slice(prefix.length).trim().split(/\s+/);
    if (!args[0]) return;
    
    // exec: if the command name or alias exists
    const cmd = client.commands.get(args[0].toLowerCase()) 
        || client.commands.get(client.aliases.get(args[0].toLowerCase()) || "");
    if (cmd) cmd.run(client, message, args.slice(1));
}));

// listener: for logging in
client.login(process.env.TOKEN).catch(() => {
    throw new Error('\n [🚧] Failed to log in. Please check your token in the .env file.\n');
});