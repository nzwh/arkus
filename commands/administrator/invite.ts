   
    import Discord, { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    import { testers } from '../../databases/preferences.json';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            if (testers.includes(message.author.id)) {
                const invite = 'https://discordapp.com/oauth2/authorize?client_id=693103255349231677&scope=bot&permissions=8';
                const in_embed = new Discord.MessageEmbed()
                    .setDescription(`> \` Use this link to invite this bot to your server! \`\n > \` ❱❱ Invite Link: \` **[Arkus Invite](${invite})**`)
                    .setColor(message.guild!.me!.displayHexColor);
                message.reply({ allowedMentions: { repliedUser: false}, embeds: [in_embed] });
            } else {
                message.channel.send("Sorry, the invite link is unavailable.");
            }
        },

        name: __filename.split(/[\\/]/).pop()!.split('.').shift(),
        alias: ['inv', 'link'],

        usage: "Provides an invite link of the bot.",
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase(),
        status: 'ACTIVE',
        extend: false
   };