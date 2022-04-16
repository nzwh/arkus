   
    import { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            if (args.some(isNaN)) {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "> **Invalid input.** Must be a numerical value." });
            } else if (args.length <= 1) {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "> Enter two or more values." });
            } else {

                let average = 0;
                for (const num of args)
                    average += Number(num);
                
                average /= (args.length);
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: `\`\`\`q\n✦ The average of [${args.join(', ')}] is ${average.toFixed(2)}.\`\`\`` });
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['avg', 'mean'],

        usage: "Gets the average of a set of numbers.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };