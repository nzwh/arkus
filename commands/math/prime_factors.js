    
    const { factorGen, primeGen } = require('../../resources/functions.js')
    module.exports.run = async (client, message, args) => {
        
        if (args.some(isNaN)) 
            message.channel.send("> **Invalid input.** Must be a numerical value.");

        else if (args.length > 1) 
            message.channel.send("> **Invalid input.** Input only one value.");

        else if (args[0] > 1000 && args[0] <= 3) 
            message.channel.send("> **Invalid input.** Must be a number between 3 and 1000.");

        else {
            var pfactor_arr = factorGen(args[0]), output = "";
            pfactor_arr.forEach(p_factor => {
                if(primeGen(p_factor) && p_factor >= 2) output += `${p_factor}, `;
            });

            message.channel.send(`\`\`\`q\n✦ Prime Factors of ${args[0]}: ${output.slice(0, -2)}\`\`\``);
        }

    }

    module.exports.help = {
        name: "pfactor",
        aliases: ['pf', 'primefactors'],
        description: "Returns a list of prime factors of a given input."
    }