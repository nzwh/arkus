    
    const { digitGen } = require('../../files/functions.js')
    module.exports.run = async (client, message, args) => {
        
        if (args.some(isNaN)) 
            message.channel.send("> **Invalid input.** Must be a numerical value.");

        else if (args.length > 1) 
            message.channel.send("> **Invalid input.** Input only one value.");

        else 
            message.channel.send(`\`\`\`q\n✦ The sum of the digits of ${args[0]} is ${digitGen(args[0])}.\`\`\` `);
    }

    module.exports.help = {
        name: "digitsum",
        aliases: ['dgs'],
        description: "Returns the sum of all the digits of an input."
    }