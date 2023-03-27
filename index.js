const { ShardingManager } = require('discord.js')
const { token } = require("./src/assets/configs/bot.js")

const { QuickDB } = require("quick.db")
const database = new QuickDB({ filePath: "./src/assets/database.sqlite" })

console.log("Started initializing database...")

const whole_db = database.all()
try {
    (async () => {
        for (let user_id in whole_db) {
            for (let item in starting) {
                const i = await database.get(`${user_id}.${item}`)
                if (!i) await database.set(`${user_id}.${item}`, starting[item])
                if (typeof starting[item] == "object") {
                    for (let subitem in starting[item]) {
                        const ii = await database.get(`${user_id}.${item}.${subitem}`)
                        if (!ii) await database.set(`${user_id}.${item}.${subitem}`, starting[item][subitem])
                        if (typeof starting[item][subitem] == "object") {
                            for (let subsubitem in starting[item][subitem]) {
                                const iii = await database.get(`${user_id}.${item}.${subitem}.${subsubitem}`)
                                if (!iii) await database.set(`${user_id}.${item}.${subitem}.${subsubitem}`, starting[item][subitem][subsubitem])
                            }
                        }
                    }
                }
            }
        }
    })()
    console.log("Finished initializing database")
} catch (exception) {
    throw new Error(`There was an error whilst updating the database. ${exception}`)
}
        
const manager = new ShardingManager('./src/hydromatter.js', {
    token: token
})
        
manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
})
        
manager.spawn()