require("http").createServer((q,s)=>s.end("24/7 Activado")).listen()

const { Client, Intents, Collection } = require('discord.js');
const token = process.env.TOKEN;
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES], ws: { properties: { $browser: "Discord iOS" } } });

fs.readdir("./src/eventos/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const evento = require(`./src/eventos/${file}`);
    let eventoName = file.split(".")[0];
    try {
      client.on(eventoName, evento.bind(null, client));
      console.log(`[Evento] ¡${eventoName} ha sido cargado con éxito!`)
    } catch (e) {
      console.log(`[Evento] ¡${eventoName} no se ha podido cargar! Detalles del error: ${e}`);
    }
  });
});

let loadCommands = function(client) {
  const { promisify } = require("util");
  const readdir = promisify(require("fs").readdir);
  try {
    let carpetas = ["Informacion"];
    carpetas.forEach(c => {
      let dir = `./src/comandos/${c}/`;
      readdir(dir, (err, files) => {
        if (err) throw err;
        console.log(`[COMANDOS] ¡Se cargaron ${files.length} comandos! (en la categoría ${c})`);
        files.forEach(f => {
          files.forEach(file => {
            if (fs.lstatSync(dir + f).isDirectory()) {
              loadCommands(dir + f);
              return;
            }

            let props = require(`${dir}${f}`);
            client.comandos.set(props.name, props);

          });
        });
      });
    });
  } catch (e) { };
};
loadCommands(client);
client.comandos = new Collection();

client.login(token).then(() => console.log("[TOKEN] ¡" + client.user.tag + " ha iniciado sesión con éxito!")).catch((e) => console.error(e));