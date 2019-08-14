const Discord = require("discord.js");
module.exports.run = async (bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("você não tem permissão!");
    if(!args[0]) return message.channel.send(`${message.author} Use *limpar (quantidade)`);
    message.channel.bulkDelete(args[0]).then(() =>{
        message.channel.send(`🗑️ **|** ${message.author.username} **as mensagens foram limpas**`).then(msg => msg.delete(5000));
    });
}

module.exports.info = {
    name: "limpar",
    aliases: ["limpar"]
  }
