module.exports = async (client, message) => {

  const prefix = process.env.PREFIX;

  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!command) return;

  let cmd = client.comandos.get(command) || client.comandos.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  if (cmd) return cmd.run(client, message, args, prefix);
  else if (!cmd && !alias) return message.reply('No tengo ningun comando llamado `' + command + '`, Usa z!help para ver mi lista de comandos.', { allowedMentions: { parse: [] } });

}