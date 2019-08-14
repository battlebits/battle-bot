const Discord = require("discord.js")
exports.run = async (bot, message, args) => {
  
message.delete()

if(!message.member.roles.some(r=>["Banir"].includes(r.name)) ) return message.reply("você não tem permissão para usar isto!");
 var razao = args.slice(1).join(" ")

let membro = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let cargo = message.member.highestRole
    if (!membro) return message.channel.send(`Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\*banir @Membro tempo motivo\`\`\ `).then(msg => msg.delete(5000));

  let userembed = new Discord.RichEmbed()

let incidentschannel = message.guild.channels.find(`name`, "👥・punidos");
if (!incidentschannel) return message.reply("Crie um canal com o nome '🚫・punições'!");
incidentschannel.send({
embed: {
  "description": `<:separador:608689044192231454>Autor: ${message.author.username}\n<:separador:608689044192231454>Punição: Banimento.\n<:separador:608689044192231454>Motivo: ${razao}`,
  "author": {
    "name": membro.user.username,
    "icon_url": membro.user.displayAvatarURL
  },
  "color": 53380,
  "thumbnail": membro.user.displayAvatarURL
}
})
    membro.ban()
   message.channel.send(`<:yes:608686579829178378> | **${message.author.username}**, punição aplicada com sucesso.`).then(msg => msg.delete(5000));
  message.delete()
}

module.exports.info = {
  name: "ban",
  aliases: ["ban"]
}

