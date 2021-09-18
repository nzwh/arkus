
    const { gcdGen } = require('../../files/functions.js')
    module.exports.run = async (client, message, args) => {
        
        if (args.some(isNaN)) 
            message.channel.send("> **Invalid input.** Must be a numerical value.");

        else if (args.length <= 1) 
            message.channel.send("> **Invalid input.** Must input two values.");

        else {
            var gcd_arr = [];
            args.forEach(value => {
                gcd_arr.push(value);
            });

            message.channel.send(`\`\`\`q\n✦ The GCD of [${gcd_arr}] is ${gcdGen(gcd_arr)}.\`\`\``)
        }
    }

    module.exports.help = {
        name: "gcd",
        aliases: ['gcdivisor'],
        description: "Returns the greatest common divisor between two inputs."
    }