module.exports.run = (bot, message, args) => {
  const Discord = require('discord.js')
  if (message.guild.region === "brazil") {
    const moment = require('moment');
    moment.locale('pt-BR');
    let usuario = message.guild.member(message.mentions.users.first() ||  message.author);
    let administrador;
    if (usuario.hasPermission("ADMINISTRATOR") === true) administrador = "Possui";
    if (usuario.hasPermission("ADMINISTRATOR") === false) administrador = "Não possui";
    let statusmebro;
    if (usuario.presence.status === "dnd") statusmebro = "Não pertubar";
    if (usuario.presence.status === "idle") statusmebro = "Ausente";
    if (usuario.presence.status === "stream") statusmebro = "Transmitindo";
    if (usuario.presence.status === "offline") statusmebro = "Offline";
    if (usuario.presence.status === "online") statusmebro = "Disponível";
    let userinfoembed = new Discord.RichEmbed()
      .setThumbnail(usuario.user.displayAvatarURL)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .addField('<:separador:608689044192231454> Usuário', `${usuario.user.tag}`, true)
      .addField('<:separador:608689044192231454> ID do Usuário', `${usuario.user.id}`, true)
      .addField('<:separador:608689044192231454> Jogando agora', usuario.user.presence.game ? usuario.user.presence.game.name : 'Nada', true)
      .addField('<:separador:608689044192231454> Bot', `${usuario.user.bot}`.replace('false', 'Falso').replace('true', 'Verdadeiro'), true)
      .addField(`<:separador:608689044192231454> Status`, `${statusmebro}`, true)
      .addField('<:separador:608689044192231454> Cargos', `${usuario.roles.size || "Não possui cargos"}`, true)
      .addField('<:separador:608689044192231454> Administrador', `${administrador}`, true)
      .addField("<:separador:608689044192231454> Conta criada no dia:", `${moment.utc(usuario.user.createdAt).format('dddd, Do MMMM YYYY, HH:mm:ss')}`, true)
      .addField("<:separador:608689044192231454> Entrou no dia:", `${moment.utc(usuario.joinedAt).format('ddd, Do MMMM YYYY, HH:mm:ss')}`, true)
      .setAuthor(`Informações do usuário: ${usuario.user.username}`, usuario.user.displayAvatarURL)
      .setColor(3553598)
    message.channel.send(userinfoembed);
  }
}

module.exports.info = {
  name: "perfil",
  aliases: ["perfil"]
}
