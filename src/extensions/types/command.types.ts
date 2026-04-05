import { Message } from 'discord.js';
import SuperClient from '../../extensions/super-client.ts';

//- @type: structure for a command module
export type Command = {
    run: (
        client: SuperClient, 
        message: Message, 
        args?: string[]
    ) => Promise<void>;

    name: string;
    category: string;
    alias: string[];
    
    description: string;
    include: boolean;
};