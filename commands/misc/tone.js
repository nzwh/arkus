
    module.exports.run = async (client, message, args) => {

        const tones = ["/j", "/hj", "/srs", "/nm", "/pos", "/neg", "/gen", "/th", "/s", "/r"];
        const random = Math.floor(Math.random() * tones.length);

        message.channel.send(tones[random]);
    }

    module.exports.help = {
        name: "tone",
        aliases: ['tn', 'f', 'flip'],
        description: "Returns one out of 10 tone indicators at random."
    }
