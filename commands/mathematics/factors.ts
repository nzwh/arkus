   
    import { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import MathFunctions from '../../extensions/math_functions';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            if (args.some(isNaN)) {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "> **Invalid input.** Must be a numerical value." });
            } else if (args.length > 1) {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "> **Invalid input.** Input only one value." });
            } else if (args[0] > 1000 && args[0] <= 3) {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "> **Invalid input.** Must not be a number above 1000." });
            } else {
                let factors = MathFunctions.factors(args[0]).join(", ");
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: `\`\`\`q\n✦ Factors of ${args[0]}: [${factors}]\`\`\`` });
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['f', 'fct'],

        usage: "Returns a list of factors of a given number.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };