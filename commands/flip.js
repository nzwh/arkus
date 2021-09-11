
    module.exports.run = async (client, message, args) => {
        var n = Math.floor(Math.random()*1000);
        switch(n%=10){
            case 1: message.channel.send("/j"); break;
            case 2: message.channel.send("/hj"); break;
            case 3: message.channel.send("/srs"); break;
            case 4: message.channel.send("/nm"); break;
            case 5: message.channel.send("/pos"); break;
            case 6: message.channel.send("/neg"); break;
            case 7: message.channel.send("/gen"); break;
            case 8: message.channel.send("/th"); break;
            case 9: message.channel.send("/s"); break;
            case 0: message.channel.send("/r"); break;
        }
    }

    module.exports.help = {
        name: "flip",
        aliases: ['f']
    }
