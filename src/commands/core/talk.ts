import { Message, PermissionFlagsBits, TextChannel } from 'discord.js';
import SuperClient from '../../extensions/super-client.ts';

import { GetFileInfo } from '../../types/path.types.ts';
import type { Command } from '../../types/command.types.ts';
const { name, category } = GetFileInfo(import.meta.url) as { name: string, category: string };;

import { ReplyHandler } from '../../packages/layout/reply-handler.ts';
import { ComponentTemplate } from '../../packages/layout/component.ts';


export default {
    run: async (client: SuperClient, message: Message, args: string[]) => {

        if (!message.member?.permissions.has(PermissionFlagsBits.Administrator)) return;
        if (message.deletable) await message.delete();

        const embed = args[0] === '--embed';
        const slicer = embed ? 2 : 1;
        const text = message.content.split(' ').slice(slicer).join(' ').substring(0, 2000);

        if (!text) return;

        (message.channel as TextChannel).send(
            embed
                ? ReplyHandler([], [ComponentTemplate(`**${text}**`)])
                : { content: text }
        );
    },

    name,
    category,
    alias: ['talk', 'say', 'speak'],
    filter: [],
    description: 'Returns any message, given an input. Add `--embed` to embed.',
    include: true

} as Command;