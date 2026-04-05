import { Message, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder, MessageFlags } from 'discord.js';
import type SuperClient from '../../extensions/super-client.ts';

import { GetFileInfo } from '../../extensions/types/path.types.ts';
import type { Command } from '../../extensions/types/command.types.ts';
const { name, category } = GetFileInfo(import.meta.url) as { name: string, category: string };;

export default {
    run: async (client: SuperClient, message: Message, args: string[]) => {

        const user = message.mentions.users.first() || message.author;
        const url = user.avatarURL({ extension: 'png', size: 4096 }) ?? user.defaultAvatarURL;
        const now = Math.floor(Date.now() / 1000);

        const container = new ContainerBuilder()
            .addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(
                    new MediaGalleryItemBuilder().setURL(url)
                )
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent([
                        `-# arkus+`,
                        `requested by @${message.author.username}`,
                        `<t:${now}:R>`
                    ].join('  •  '))
            );

        message.reply({
            components: [container],
            flags: MessageFlags.IsComponentsV2,
            allowedMentions: { repliedUser: false }
        });

        return;
    },

    name,
    category,
    alias: ['av', 'pfp', 'dp'],
    description: 'Displays a user\'s avatar.',
    include: true

} as Command;