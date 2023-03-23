(async () => {
    const express = require("express")
    const app = express()
    const port = 3000
    
    app.get("/", async (request, response) => {
        response.sendFile(__dirname + "/assets/pages/index.html")
    })
    
    app.listen(port, async () => console.log(`Successful EXPRESS host on port ${port}`))
    
    const fs = require("node:fs")
    const path = require("node:path")

    fs.writeFileSync(
        __dirname + "/assets/pages/console/main.html",
        fs.readFileSync(__dirname + "/assets/pages/console/default.html", (error) => {
            if (error) console.log(error)
        })
    )
    app.get("/console", (request, response) => {
        response.sendFile(__dirname + "/assets/pages/console/main.html")
    })
    console.log = function (string) {
        process.stdout.write(`${string}\n`)
        const file_content = fs.readFileSync(__dirname + "/assets/pages/console/main.html")
        fs.writeFileSync(
            __dirname + "/assets/pages/console/main.html",
            file_content + `\n${string.replace(/\n/g, "\n<br>\n").replace(/ /g, "⠀")}\n<br>`,
            (error) => {
                if (error) console.log(error)
            }
        )
        app.get("/console", async (request, response) => {
            response.sendFile(__dirname + "/assets/pages/console.html")
        })
    }
    
    const { Client, GatewayIntentBits, Collection, ActivityType, Routes, REST } = require("discord.js")
    const Database = require("quick.db").QuickDB
    
    const hydromatter = {
        source_code: "https://github.com/hyperknf/Hydromatter",
        client: new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
            ]
        }),
        events: require("discord.js").Events,
        config: require("./assets/configs/bot.js"),
        log: console.log,
        commands: new Collection(),
        cooldowns: require("./assets/configs/cooldown.js"),
        database: new Database({ filePath: __dirname + "/assets/database.sqlite" }),
        chatgpt: new (require("./assets/packages/chatgpt"))(process.env.openai_token),
        functions: require("./assets/packages/hydromatter_functions"),
        filter: require("./assets/packages/filter"),
        bigint: require("./assets/packages/bigint"),
        started: Date.now(),
        version: {
            major: "4.1",
            minor: "4.1.2",
            fixes: "4.1.2a",
            log: "` - ` Added </chatgpt:1083364337479057459>, </work:1085536479633211492> and </beg:1085543733098991647>\n` - ` Added \"Latest Update\", \"Source Code\", \"Servers\", \"Server Members\" and \"Shards\" section to </bot_information:1082279023624867902>\n` - ` New module and methods for handling numbers\n` - ` Updated debugging and profane words list\n` - ` Bug fixes"
        }
    }
    
    const whole_db = await hydromatter.database.all()
    
    const starting = {
        economy: {
            cash: hydromatter.bigint.new(0),
            bank: hydromatter.bigint.new(0),
            gems: hydromatter.bigint.new(100),
            hydro: hydromatter.bigint.new(0)
        },
        moderation: {
            warns: {}
        },
        cooldowns: {
            work: 0,
            beg: 0
        },
        banned: 0
    }
    
    const init_user_db = async (user_id) => {
        user_id = String(user_id)
    
        const user_data = await hydromatter.database.get(user_id)
        if (!user_data) {
            await hydromatter.database.set(user_id, starting)
        } else {
            for (let item in starting) {
                const i = await hydromatter.database.get(`${user_id}.${item}`)
                if (!i) await hydromatter.database.set(`${user_id}.${item}`, starting[item])
                if (typeof starting[item] == "object") {
                    for (let subitem in starting[item]) {
                        const ii = await hydromatter.database.get(`${user_id}.${item}.${subitem}`)
                        if (!ii) await hydromatter.database.set(`${user_id}.${item}.${subitem}`, starting[item][subitem])
                        if (typeof starting[item][subitem] == "object") {
                            for (let subsubitem in starting[item][subitem]) {
                                const iii = await hydromatter.database.get(`${user_id}.${item}.${subitem}.${subsubitem}`)
                                if (!iii) await hydromatter.database.set(`${user_id}.${item}.${subitem}.${subsubitem}`, starting[item][subitem][subsubitem])
                            }
                        }
                    }
                }
            }
        }
    }
    
    try {
        for (let user_id in whole_db) {
            for (let item in starting) {
                const i = await hydromatter.database.get(`${user_id}.${item}`)
                if (!i) await hydromatter.database.set(`${user_id}.${item}`, starting[item])
                if (typeof starting[item] == "object") {
                    for (let subitem in starting[item]) {
                        const ii = await hydromatter.database.get(`${user_id}.${item}.${subitem}`)
                        if (!ii) await hydromatter.database.set(`${user_id}.${item}.${subitem}`, starting[item][subitem])
                        if (typeof starting[item][subitem] == "object") {
                            for (let subsubitem in starting[item][subitem]) {
                                const iii = await hydromatter.database.get(`${user_id}.${item}.${subitem}.${subsubitem}`)
                                if (!iii) await hydromatter.database.set(`${user_id}.${item}.${subitem}.${subsubitem}`, starting[item][subitem][subsubitem])
                            }
                        }
                    }
                }
            }
        }
    } catch (exception) {
        throw new Error(`There was an error whilst updating the database. ${exception}`)
    }
    const commands = []
    const mainCommandPath = path.join(path.join(__dirname, "assets"), "commands")
    
    let commandsPath = path.join(mainCommandPath, "miscellaneous")
    let commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        hydromatter.commands.set(command.data.name, command)
        commands.push(command.data.toJSON())
    }
    commandsPath = path.join(mainCommandPath, "economy")
    commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        hydromatter.commands.set(command.data.name, command)
        commands.push(command.data.toJSON())
    }
    commandsPath = path.join(mainCommandPath, "moderation")
    commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        hydromatter.commands.set(command.data.name, command)
        commands.push(command.data.toJSON())
    }

    const rest = new REST({ version: '10' }).setToken(hydromatter.config.token)
    
    hydromatter.client.once(hydromatter.events.ClientReady, async user_object => {
        hydromatter.log(`\n*********************************************`)
        hydromatter.log(`|===> ${user_object.user.username} has successfully logged in`)
        hydromatter.log(`|===> Version\n |==> Major\n  |=> ${hydromatter.version.major}\n |==> Minor\n  |=> ${hydromatter.version.minor}\n |==> Fixes\n  |=> ${hydromatter.version.fixes}`)
        hydromatter.log(`|===> Timestamp\n |==> ${hydromatter.started}`)
        hydromatter.log(`|===> Hosting\n |==> Port\n  |=> ${port}\n |==> Page\n  |=> https://Hydromatter.hyperknf.repl.co`)
        hydromatter.log(`|===> Source Code\n |==> ${hydromatter.source_code}`)
        hydromatter.log(`*********************************************\n`)
    
        try {
            hydromatter.log("Started loading slash commands...")
            const data = await rest.put(Routes.applicationCommands(hydromatter.config.clientId), { body: commands })
            for (let i = 0; i <= commands.length - 1; i++) hydromatter.log(`Loaded /${commands[i].name}`)
            hydromatter.log(`Finished loading ${commands.length} slash commands`)
        } catch (exception) {
            throw new Error(exception)
        }
    
        hydromatter.client.user.setPresence({
            activities: [{
                name: `Hydromatter Version ${hydromatter.version.fixes}`,
                type: ActivityType.Playing
            }],
            status: 'dnd',
        })
    })
    
    hydromatter.client.on(hydromatter.events.MessageCreate, async message => {
        const user_id = message.author.id
    
        if (user_id) init_user_db(user_id)
    })
    
    hydromatter.client.on(hydromatter.events.InteractionCreate, async interaction => {
        init_user_db(interaction.user.id)
    
        if (hydromatter.database.get(`${interaction.user.id}.banned`) == 1) return interaction.reply({
            content: "Your access to the bot is forbidden",
            ephemeral: true
        })
    
        // if (interaction.user.id == "758637557776252949") return interaction.reply(":middle_finger:")
    
        if (interaction.isChatInputCommand()) {
            try {
                await interaction.deferReply()
                await hydromatter.commands.get(interaction.commandName).execute(hydromatter, interaction)
            } catch (exception) {
                hydromatter.log(exception)
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error whilst executing this command',
                        ephemeral: true
                    })
                } else {
                    await interaction.reply({
                        content: 'There was an error whilst executing this command',
                        ephemeral: true
                    })
                }
            }
        }
    })
    
    hydromatter.client.login(hydromatter.config.token)
})()