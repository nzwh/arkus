import { Client, Intents, Collection } from 'discord.js';

class SuperClient extends Client {

    public commands: Collection<unknown, any>;
    public aliases: Collection<unknown, any>;
    public categories: Array<string>;

    constructor(){
        super({ intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
        ]});
        this.commands = new Collection();
        this.aliases = new Collection();
        this.categories = [];
    }

}

export default SuperClient;
