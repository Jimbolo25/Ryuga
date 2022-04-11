const { ActivitiesOptions } = require('discord.js');

module.exports = async (client) => {

  const coso = [
    { name: 'ser el mejor!', type: 'COMPETING' },
    { name: `${client.guilds.cache.size} servidores!`, type: 'WATCHING' },
    { name: 'mc.jifercraft.ml', type: 'PLAYING' },
    { name: `${client.users.cache.size} usuarios!`, type: 'WATCHING' },
    { name: `${client.comandos.size} comandos!`, type: 'WATCHING' }
  ]

  setInterval(() => {
    const coso2 = coso[Math.floor(Math.random() * coso.length)]

    client.user.setPresence({
      activities: [coso2],
      status: 'online'
    })


  }, 60000)

}