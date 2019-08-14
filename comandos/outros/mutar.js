const ms = require("ms");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete()

  if (!message.member.roles.some(r => ["Mutar"].includes(r.name))) return message.reply("você não tem permissão para usar isto!").then(msg => msg.delete(5000));

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let cargo = message.member.highestRole
  if (!tomute) return message.channel.send(`<:No:608686547809599491> | Argumento insuficiente.\n ▫ | **${message.author.username}**, o uso correto é: \`\`\*mutar @Membro tempo motivo\`\`\ `).then(msg => msg.delete(5000));
  let muterole = message.guild.roles.find(role => role.name === 'Mutado');
  let reason = args.slice(2).join(" ");


  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Mutado",
        color: "RANDOM",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if (!mutetime) return message.reply("**Indique um tempo.**");
  message.delete().catch(O_o => { });
  try {
    await tomute.send(" ")
  } catch (e) {
    message.channel.send(" ")
  }
  //end of create role
  let muteembed = new Discord.RichEmbed()
    .setAuthor(`PUNIÇÃO`, bot.user.avatarURL)
    .addField("Informações:", `**Usuário**: ${tomute.user.username}\n **ID**: ${tomute.id}\n **Motivo**: ${reason}\n **Tempo silenciado**: ${mutetime}\n **Punição**: TempMute \n \n **Autor**: ${message.author}\n **Canal**: ${message.channel}`)
    .setThumbnail(message.author.avatarURL)
    .setColor(3553598)
    .setFooter('Equipe de moderação - Faaster', "https://cdn.discordapp.com/attachments/444957023130353674/462671084907528213/460264772869554176.gif")
    .setTimestamp();
  let incidentschannel = message.guild.channels.find(`name`, "👥・punidos");
  if (!incidentschannel) return message.reply("Deu erro ;_;");
  incidentschannel.send({
    embed: {
      "description": `<:separador:608689044192231454>Autor: ${message.author.username}\n<:separador:608689044192231454>Punição: Mute.\n<:separador:608689044192231454>Motivo: ${reason}`,
      "author": {
        "name": tomute.user.username,
        "icon_url": tomute.user.displayAvatarURL
      },
      "color": 53380,
      "thumbnail": tomute.user.displayAvatarURL
    }
  })
  message.channel.send(" ")
  await(tomute.addRole(muterole.id));
  message.channel.send(`<:yes:608686579829178378> | **${message.author.username}**, punição aplicada com sucesso.`).then(msg => msg.delete(5000));
  setTimeout(function () {
    tomute.removeRole(muterole.id);
    bot.users.get(message.author.id).send(`⏲ | **${message.author.username}**, o silenciamento de <@${tomute.id}> foi revogado.`)
  }, ms(mutetime));
}

module.exports.info = {
  name: "mutar",
  aliases: ["mutar"]
}
