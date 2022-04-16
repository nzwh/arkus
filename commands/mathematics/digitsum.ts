   
    import { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import MathFunctions from '../../extensions/math_functions';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            if (args.some(isNaN)) {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "**Invalid input.** Must be a numerical value." });
            } else if (args.length > 1) {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: "**Invalid input.** Input only one value." });
            } else {
                message.reply({ allowedMentions: { repliedUser: false }, 
                    content: `\`\`\`q\n✦ The sum of the digits of ${args[0]} is ${MathFunctions.digitsum(args[0])}.\`\`\` ` });
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['dgs'],

        usage: "Returns the sum of all the digits of an input.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };