import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import type { Command } from '../types/command.types.ts';

//- @class: extends the Discord Client to include command handling and cooldowns
export default class SuperClient extends Client {

    public commands: Collection<string, Command>;
    public aliases: Collection<string, string>;
    public categories: Array<string>;

    public players: Set<string>
    public cooldowns: Map<string, Map<string, number>>; 

    constructor(){
        super({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildVoiceStates
        ], partials: [
            Partials.Channel,
            Partials.Message,
            Partials.Reaction,
            Partials.User
        ]});
        this.commands = new Collection();
        this.aliases = new Collection();
        this.categories = [];

        this.players = new Set();
        this.cooldowns = new Map();
    }

}