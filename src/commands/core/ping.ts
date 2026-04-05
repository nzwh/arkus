import { Message } from 'discord.js';
import SuperClient from '../../extensions/super-client.ts';

import { GetFileInfo } from '../../types/path.types.ts';
import type { Command } from '../../types/command.types.ts';
const { name, category } = GetFileInfo(import.meta.url) as { name: string, category: string };;

import { ReplyHandler } from '../../packages/layout/reply-handler.ts';
import { ComponentTemplate } from '../../packages/layout/component.ts';


export default {
    run: async (client: SuperClient, message: Message, args: string[]) => {

        const reply = await message.reply(ReplyHandler([], [
            ComponentTemplate(`-# **\`🏓\` pinging...**`)
        ]));

        const latency = Math.floor(reply.createdTimestamp - message.createdTimestamp);
        await reply.edit(ReplyHandler([], [
            ComponentTemplate(`-# **\`🏓\` **pong!** — latency: \`${latency}ms\`**`)
        ]));

        return;
    },

    name,
    category,
    alias: ['ping'],
    filter: [],
    description: 'Fetches the bot\'s latency.',
    include: true

} as Command;