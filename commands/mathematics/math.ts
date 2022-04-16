   
    import { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import { evaluate } from 'mathjs';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            try {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: `\`\`\`py\n✦ Result: ${evaluate(args.join(" ").replace(/```/g, ""))}\`\`\`` });
            } catch {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: `\`\`\`fix\n✦ Expression calculation failed. Invalid inputs.\`\`\`` })
                    .then(msg => { setTimeout(() => msg.delete(), 5000)});
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['m', 'calc', 'solve'],

        usage: "Evaluates a math expression.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };