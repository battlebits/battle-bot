const { Client, Collection } = require("discord.js");
const moment = require("moment")

require('moment-duration-format')
moment.locale('pt-BR')

const bot = new Client()
const { readdir, lstatSync } = require("fs");
const { token, prefix } = require("./config.json");

bot.cmds = new Collection();
bot.aliases = new Collection();

bot.on("ready", () => {
  console.log(`${bot.user.username} está online!`);
});

const carregarComandos = module.exports.carregarComandos = (dir = "./comandos/") => {
  readdir(dir, (erro, arquivos) => {
    if (erro) return console.log(erro);
    arquivos.forEach((arquivo) => {
      try {
        if (lstatSync(`./${dir}/${arquivo}`).isDirectory()) {
          carregarComandos(`./${dir}/${arquivo}`)
        } else if (arquivo.endsWith(".js")) {
          const props = require(`./${dir}/${arquivo}`)
          if (!props || !props.info || !props.run || !props.info.aliases || !props.info.name) {
            console.log(`Não foi possível carregar o comando ${arquivo.split(".")[0]}!`);
            return;
          }
          bot.cmds.set(props.info.name, props);
          props.info.aliases.forEach((alias) => {
            bot.aliases.set(alias, props)
          })

          console.log(`Comando ${props.info.name} e seus ${props.info.aliases.length} aliases salvos.`)
        }
      } catch (ex) {
        console.log(`Erro ao ler o arquivo ${arquivo}!`)
        console.log(ex)
      }
    })
  })
}
carregarComandos();

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message.channel.type != 'text') return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  const cmdParaExecutar = bot.cmds.get(cmd) || bot.aliases.get(cmd)
  if (cmdParaExecutar != null) cmdParaExecutar.run(bot, message, args)
})

bot.login(token)
