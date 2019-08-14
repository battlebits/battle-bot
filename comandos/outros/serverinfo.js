const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let online = message.guild.members.filter(a => a.presence.status == "online").size;
   let ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
   let ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
   let offline = message.guild.members.filter(a => a.presence.status == "offline").size;
   let totalmembros = message.guild.memberCount;
   let canaistexto = message.guild.channels.filter(a => a.type === "text").size;
   let canaisvoz = message.guild.channels.filter(a => a.type === "voice").size;
   let serverembed = new Discord.RichEmbed()
   .setColor(3553598)
   .setTitle(`**${message.guild.name}**`)
   .addField("<:separador:608689044192231454> ID do servidor:", message.guild.id, true)
   .addField("<:separador:608689044192231454> Nome do servidor:", message.guild.name, true)
   .addField('<:separador:608689044192231454> Dono do servidor:', `<@${message.guild.owner.id}>`, true)
   .addField(`<:separador:608689044192231454> Servidor Criado:`, `Dia ${day}/${month}/${year}`, true)
   .addField(`<:separador:608689044192231454> Membros: ${totalmembros}`, `<a:online:609931678110056468>Online: ${online}<a:ausente:609931662473691168> Ausente: ${ausente}<a:ocupado:609931668450705429>Ocupado: ${ocupado}<a:invisivel:609931684153917440>Offline: ${offline} 🤖Bots: ${message.guild.members.filter(m => m.user.bot).size}`,true)
   .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
   .setTimestamp(new Date())
   message.channel.send(serverembed);

}

 module.exports.info = {
  name: "serverinfo",
  aliases: ["serverinfo"]
}
