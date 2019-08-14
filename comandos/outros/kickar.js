const Discord = require("discord.js");
exports.run = (bot, message, args) => {

  message.delete()

  if (!message.member.roles.some(r => ["Kickar"].includes(r.name))) return message.reply("você não tem permissão para usar isto!");
  var razao = args.slice(1).join(" ")



  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let cargo = message.member.highestRole
  if (!tomute) return message.channel.send(`<:No:608686547809599491> | Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\*kickar @Membro tempo motivo\`\`\ `).then(msg => msg.delete(5000));

  var razao = args.slice(1).join(" ")
  var membro = message.mentions.members.first();

  if (!membro) return message.channel.send()
  if (!membro.kickable) return message.channel.send()
  if (razao.length < 1) return message.channel.send()
  membro.kick()

  let Kcembed = new Discord.RichEmbed()
    .setAuthor(`PUNIÇÃO`, bot.user.avatarURL)
    .addField("Informações:", `**Usuário**: ${membro.user.username}\n **ID**: ${membro.user.id}\n **Motivo**: ${razao}\n **Punição**: Kick \n \n **Autor**: ${message.author}\n **Canal**: ${message.channel}`)
    .setThumbnail(message.author.avatarURL)
    .setColor(3553598)
    .setFooter('Equipe de moderação - Faaster', "https://cdn.discordapp.com/attachments/444957023130353674/462671084907528213/460264772869554176.gif")
    .setTimestamp();
  let incidentschannel = message.guild.channels.find(`name`, "👥・punidos");
  if (!incidentschannel) return message.reply("Deu erro ;_;");
  incidentschannel.send({
    embed: {
      "description": `<:separador:608689044192231454>Autor: ${message.author.username}\n<:separador:608689044192231454>Punição: Kick.\n<:separador:608689044192231454>Motivo: ${razao}`,
      "author": {
        "name": membro.user.username,
        "icon_url": membro.user.displayAvatarURL
      },
      "color": 53380,
      "thumbnail": membro.user.displayAvatarURL
    }
  })
  message.channel.send(`<:yes:608686579829178378> | **${message.author.username}**, punição aplicada com sucesso.`).then(msg => msg.delete(5000));
}

module.exports.info = {
  name: "kickar",
  aliases: ["kick"]
}
