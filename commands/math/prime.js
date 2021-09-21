    
    const { primeGen } = require('../../resources/functions.js')
    module.exports.run = async (client, message, args) => {
        
        if (args.some(isNaN)) 
            message.channel.send("> **Invalid input.** Must be a numerical value.");

        else if (args.length > 1) 
            message.channel.send("> Input only one numerical value.");

        else {
            if (primeGen(args[0])) 
                message.channel.send(`\`\`\`py\n✦ The number ${args[0]} is a prime.\`\`\``);
            else 
                message.channel.send(`\`\`\`py\n✦ The number ${args[0]} is not a prime.\`\`\``);
        }
    }

    module.exports.help = {
        name: "prime",
        aliases: ['pr'],
        description: "Returns if a given number is prime or not."
    }