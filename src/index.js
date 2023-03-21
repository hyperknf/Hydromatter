const { ShardingManager } = require('discord.js')
const { token } = require("./assets/configs/bot.js")

const manager = new ShardingManager('./hydromatter.js', {
  token: token
})

manager.on('shardCreate', shard => {
  console.log(`Launched shard ${shard.id}`)
})

manager.spawn()