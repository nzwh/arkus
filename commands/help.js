
    module.exports.run = async (client, message, args) => {
        
        var data = require('fs').readFileSync(`./archives/help.txt`).toString()
            message.channel.send(data)
    }

    module.exports.help = {
        name: "help"
    }