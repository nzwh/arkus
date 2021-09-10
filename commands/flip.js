
    module.exports.run = async (client, message, args) => {
        if ((Math.floor(Math.random()*100))%2) message.channel.send("/j")
        else message.channel.send("/srs")
    }

    module.exports.help = {
        name: "flip",
        aliases: ['f']
    }
