import { ActivityType, Events } from 'discord.js';
import { config } from 'dotenv';

import SuperClient from './src/extensions/super-client.ts';
import AsyncHandler from './src/extensions/async-handler.ts';

import { LoadCommands } from './src/events/load-commands.ts';
import { ComponentTemplate } from './src/packages/layout/component.ts';
import { ReplyHandler } from './src/packages/layout/reply-handler.ts';


config() && console.info('\n');
const prefix = process.env.PREFIX || '-';
const client = new SuperClient();
    await LoadCommands(client);


client.once(Events.ClientReady, () => {
    console.info(`\n [💫] Online in ${client.guilds.cache.size} servers.`);
    client.user?.setPresence({ activities: [{
        name: 'https://ark.us ・ -help',
        type: ActivityType.Custom
    }], status: 'dnd' });
});

client.on(Events.MessageCreate, AsyncHandler(async (message) => {
    if (message.author.bot || !message.guild)
        return;

    const content = message.content.toLowerCase();
    if ((content.split(' '))[0] === `<@${client.user?.id}>`)
        return message.reply(ReplyHandler([], [
            ComponentTemplate(`-# **\`👋\` — hi! my prefix is \`${prefix}\`**`)
        ])), void 0;
    if (!content.startsWith(prefix) || content.length <= 1) 
        return;
    
    const args = content.slice(prefix.length).trim().split(/\s+/);
    if (!args[0]) return;
    
    const cmd = client.commands.get(args[0].toLowerCase()) 
        || client.commands.get(client.aliases.get(args[0].toLowerCase()) || "");
    if (cmd) cmd.run(client, message, args.slice(1));
}));

client.login(process.env.TOKEN).catch(() => {
    throw new Error('\n [🚧] Failed to log in. Please check your token in the .env file.\n');
});