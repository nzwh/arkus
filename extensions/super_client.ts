import { Client, Intents, Collection } from 'discord.js';

class SuperClient extends Client {

    public commands: Collection<unknown, any>;
    public aliases: Collection<unknown, any>;

    constructor(){
        super({ intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
        ]});
        this.commands = new Collection();
        this.aliases = new Collection();
    }

}

export default SuperClient;
