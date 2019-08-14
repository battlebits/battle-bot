const { RichEmbed } = require("discord.js");

const moment = require('moment');

module.exports.run = (bot, message, args, con) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let str = args.join(" ");
    if (!str) return message.channel.send(`Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\*Anúncio [mensagem]\`\`\ `).then(message => { setTimeout(() => { message.delete() }, 100000) })

    message.delete();

    let canal = bot.channels.get("608680276461355029")
    if (!canal) return message.channel.send(`**${message.author.username}**, canal de change-logs não foi encontrado.`).then(message => { setTimeout(() => { message.delete() }, 100000) })
    if (!canal) return;
    canal.send({

        embed: {
            
            description: (str),
            author: {
                name: `Anúncio:`,
                icon_url: `https://cdn.discordapp.com/attachments/488472706224750634/507649769741484033/Sino.gif`
            },
            color: 16562432,
            footer: {
                text: `Enviado por ${message.author.username}`,
                icon_url: `${message.author.displayAvatarURL}`

            },
            timestamp: new Date(),
        }

    })
}



module.exports.info = {
    name: "anuncio",
    aliases: ["anun"]
}
