    
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

        desc_extense: "The math command uses the `mathjs` package's functions to evaluates given expressions. This creates a flexible calculator that can be used within Discord.",
        desc_example: "\` ✦ Basic Expressions: Add [+], Subtract [-], Multiply [∗], Divide[/] \n ✦ Exponents [^2] and Square Roots [sqrt(2)] \n ✦ Logarithmic Functions [log(2)] \n ✦ Trigonometry: Sine [sin(2)], Cosine [cos(2)], Tangent[tan(2)] \n ✦ Measurement Conversion: 2inch to cm, 4km to miles, etc. \n ✦ Complex Expressions, and more.\`" 
    }