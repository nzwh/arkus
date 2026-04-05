import { ContainerBuilder, TextDisplayBuilder } from "discord.js";

export const ComponentTemplate = (content?: string): ContainerBuilder => {
    return new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(content || '')
        );
}