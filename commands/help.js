
    module.exports.run = async (client, message, args) => {
        
        // extracts text from help.txt
        var data = require('fs').readFileSync(`./files/help.txt`).toString()
            message.channel.send(data)
    }

    module.exports.help = {
        name: "help",
        aliases: ['h']
    }