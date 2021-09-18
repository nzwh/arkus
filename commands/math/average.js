 
    module.exports.run = async (client, message, args) => {

        var average = 0;
        if (args.some(isNaN)) 
            message.channel.send("> **Invalid input.** Must be a numerical value.");

        else if (args.length <= 1) 
            message.channel.send("> Enter two or more values.");

        else {
            args.forEach(n => {
                average += parseFloat(n);
            });
            
            average /= (args.length);
            message.channel.send(`\`\`\`q\n✦ The average is ${average.toFixed(2)}.\`\`\``);
        }
    }

    module.exports.help = {
        name: "average",
        aliases: ['avg', 'mean'],
        description: "Gets the average of a set of numbers."
    }