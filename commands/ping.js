    
    module.exports.run = async (client, message, args) => {
        
        const msg = await message.channel.send('🎮 pinging...');
            msg.edit(`🎮 pong!~  |  🏳️ latency: **${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms**`);
    }

    module.exports.help = {
        name: "ping"
    }
