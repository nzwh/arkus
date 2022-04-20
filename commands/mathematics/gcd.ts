   
    import { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import MathFunctions from '../../extensions/math_functions';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            if (args.some(isNaN)) {

                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "> **Invalid input.** Must be a numerical value." });
                    
            } else if (args.length <= 1) {

                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "> **Invalid input.** Must input two values." });

            } else {

                let content = `\`\`\`q\n✦ The GCD of [${args.join(', ')}] is ${MathFunctions.gcd(args)}.\`\`\``;
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: content.substring(0, 2000) });
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['gcdivisor'],

        usage: "Returns the greatest common divisor between two inputs.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };