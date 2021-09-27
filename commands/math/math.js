    
    const { evaluate } = require("mathjs");
    module.exports.run = async (client, message, args) => {
        
        try {
            // evaluates the expression, and sends the message.
            message.channel.send(`\`\`\`py\n✦ Result: ${evaluate(args.join(" "))}\`\`\``);

        } catch {
            // catches the error
            message.channel.send(`\`\`\`fix\n✦ Expression calculation failed. Invalid inputs.\`\`\``)
                .then(r => r.delete({timeout: 3000}));
        }
        
    }

    module.exports.help = {
        name: "math",
        aliases: ['m', 'calc', 'solve'],
        description: "Evaluates a math expression with proper syntax.",
        
        category: "math",
        status: "active",
        extend: true,
    }