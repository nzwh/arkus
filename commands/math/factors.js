    
    const { factorGen } = require('../../files/functions.js')
    module.exports.run = async (client, message, args) => {
        
        if (args.some(isNaN)) 
            message.channel.send("> **Invalid input.** Must be a numerical value.");

        else if (args.length > 1) 
            message.channel.send("> **Invalid input.** Input only one value.");

        else if (args[0] > 1000 && args[0] <= 3) 
            message.channel.send("> **Invalid input.** Must not be a number above 1000.");

        else {
            var factor_arr = factorGen(args[0]), output = "";
            factor_arr.forEach(factor => {
                output += `${factor}, `;
            });

            message.channel.send(`\`\`\`q\n✦ Factors of ${args[0]}: ${output.slice(0, -2)}\`\`\``);
        }

    }

    module.exports.help = {
        name: "factor",
        aliases: ['f', 'factors'],
        description: "Returns a list of factors of a given input."
    }