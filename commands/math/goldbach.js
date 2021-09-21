    
    const { goldbachGen } = require('../../resources/functions.js')
    module.exports.run = async (client, message, args) => {
        
        if (args.some(isNaN)) 
            message.channel.send("> **Invalid input.** Must be a numerical value.");

        else if (args.length > 1) 
            message.channel.send("> **Invalid input.** Input only one value.");

        else if (!(args[0] > 3 && args[0]%2 == 0)) 
            message.channel.send("> **Invalid input.** Must be greater than 3, and an even number.");

        else if (args[0] > 10000) 
            message.channel.send("> **Invalid input.** Must not be a number above 1000.");

        else {
            var goldbach_arr = goldbachGen(args[0]), output = "";
            goldbach_arr.forEach(goldbach => {
                output += `✦ ${goldbach.toString().replace(',', ' & ')} \n`;
            });

            message.channel.send(`\`\`\`q\n✦ Goldbach Conjecture of ${args[0]}: \n${output}\`\`\``);
        }
    }

    module.exports.help = {
        name: "goldbach",
        aliases: ['gb', 'gbcj'],
        description: "Returns a list of two primes that when added, equal to the input."
    }