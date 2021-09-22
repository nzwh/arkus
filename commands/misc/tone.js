
    module.exports.run = async (client, message, args) => {

        const tones = ["/j", "/hj", "/srs", "/nm", "/pos", "/neg", "/gen", "/th", "/s", "/r"];
        const random = Math.floor(Math.random() * tones.length);

        message.channel.send(tones[random]);
    }

    module.exports.help = {
        name: "tone",
        aliases: ['t', 'flip'],
        description: "Returns a random tone indicator.",
        category: "misc",
        status: "active"
    }
