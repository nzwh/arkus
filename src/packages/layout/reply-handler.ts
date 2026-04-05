import { EmbedBuilder, MessageFlags, MessageFlags as MF, type ContainerBuilder } from "discord.js";

export const ReplyHandler = (embeds?: EmbedBuilder[], components?: ContainerBuilder[]) => {
    return {
        embeds: embeds ?? [],
        components: components ?? [],
        flags: [MessageFlags.IsComponentsV2] as const,
        allowedMentions: { repliedUser: false }
    };
}