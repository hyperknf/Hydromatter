(async () => {
    const express = require("express")
    const app = express()
    const port = 3000
    
    app.listen(port, async () => console.log(`Successful EXPRESS host on port ${port}`))
    
    const fs = require("node:fs")
    const path = require("node:path")

    const patreon_campaign = require("./assets/packages/patreon")

    fs.writeFileSync(
        __dirname + "/assets/pages/log.txt",
        "/"
    )
    app.use((request, response, next) => {
        fs.writeFileSync(
            __dirname + "/assets/pages/log.txt",
            fs.readFileSync(__dirname + "/assets/pages/log.txt", (error) => {
                if (error) console.log(error)
            }) + "\n" + request.url
        )
        next()
    })

    app.get("/", async (request, response) => {
        response.sendFile(__dirname + "/assets/pages/index.html")
    })
        
    app.get("/files", async (request, response) => {
        response.sendFile(__dirname + "/assets/pages/files.html")
    })
    app.use("/files", express.static(__dirname + "/../"))
    
    const { Client, GatewayIntentBits, Collection, ActivityType, Routes, REST, EmbedBuilder } = require("discord.js")
    const Database = require("quick.db").QuickDB

    const items = {}
    const itemsPath = path.join(path.join(__dirname, "assets"), "items")
    let itemFiles = fs.readdirSync(itemsPath).filter(file => file.endsWith('.js'))
    for (const file of itemFiles) {
        const filePath = path.join(itemsPath, file)
        const item = require(filePath)
        items[item.id] = item
    }
    
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
        items: items,
        cooldowns: require("./assets/configs/cooldowns.js"),
        developers: [
            "655678656970227714"
        ],
        database: new Database({ filePath: __dirname + "/assets/database.sqlite" }),
        chatgpt: new (require("./assets/packages/chatgpt"))(process.env.openai_token),
        functions: require("./assets/packages/hydromatter_functions"),
        filter: require("./assets/packages/filter"),
        bigint: require("./assets/packages/bigint"),
        started: Date.now(),
        version: {
            major: "4.1",
            minor: "4.1.5",
            fixes: "4.1.5a",
            log: "` - ` Added \"Latest Update\", \"Source Code\", \"Servers\", \"Server Members\" and \"Shards\" section to </bot_information:1082279023624867902>\n` - ` New module and methods for handling numbers\n` - ` Updated debugging and profane words list\n` - ` Bug fixes"
        },
        patreon_campaign: new patreon_campaign(require("./assets/configs/patreon.js"))
    }
    
    const starting = require("./assets/configs/starting.js")
    
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

        const patrons = await hydromatter.patreon_campaign.fetchPatrons(['active_patron'])
        const includes = patrons.filter(patron => patron.discord_user_id == user_id)
        if (includes.length >= 1) await hydromatter.database.set(`${user_id}.patreon`, (
            includes[0].will_pay_amount_cents == 500 ? 1 :
            includes[0].will_pay_amount_cents == 1000 ? 2 :
            includes[0].will_pay_amount_cents == 2000 ? 3 :
            includes[0].will_pay_amount_cents == 5000 ? 4 :
            0
        ))
    }
    hydromatter.init_user_db = init_user_db
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

        const banned = await hydromatter.database.get(`${interaction.user.id}.banned`)
        if (banned == 1 && (interaction.isChatInputCommand() && !(interaction.commandName == "developer"))) return interaction.reply({
            content: "Your access to the bot is forbidden",
            ephemeral: true
        })
    
        // if (interaction.user.id == "758637557776252949") return interaction.reply(":middle_finger:")
    
        if (interaction.isChatInputCommand()) {
            try {
                await interaction.deferReply()

                const is_patron = await hydromatter.database.get(`${interaction.user.id}.patreon`)
                if (is_patron >= 2) await hydromatter.database.set(`${interaction.user.id}.cooldowns`, starting.cooldowns)

                const user_id = interaction.user.id
                const time = Date.now()
                if (hydromatter.cooldowns[interaction.commandName]) {
                    const cooldown = await hydromatter.database.get(`${user_id}.cooldowns.${interaction.commandName}`)
                    const is_patron = await hydromatter.database.get(`${user_id}.patreon`)
                    if (time - cooldown < (is_patron == 1 ? hydromatter.cooldowns[interaction.commandName].premium : hydromatter.cooldowns[interaction.commandName].normal)) {
                        const latency = Date.now() - time
                  
                        const embed = new EmbedBuilder()
                        .setColor("FF0000")
                        .setTitle("The command is still on cooldown")
                        .setDescription(`Please try again <t:${Math.round((cooldown + (is_patron == 1 ? hydromatter.cooldowns[interaction.commandName].premium : hydromatter.cooldowns[interaction.commandName].normal)) / 1000)}:R>\n\nNormal cooldown: ${hydromatter.functions.format_time(hydromatter.cooldowns[interaction.commandName].normal)}\n[Premium](https://www.patreon.com/Hydromatter) cooldown: ${hydromatter.functions.format_time(hydromatter.cooldowns[interaction.commandName].premium)}\n\n**\` - \` Why is there a cooldown?**\nThis is to either balance the system, or to avoid the API to be flooded with requests. If you want faster cooldown(s), you can buy premium [here](https://www.patreon.com/Hydromatter)`)
                        .setTimestamp()
                        .setFooter({ text: `Process: ${latency}ms` })
                      
                        return interaction.editReply({
                            embeds: [embed],
                            ephemeral: true
                        })
                    }
                    await hydromatter.database.set(`${user_id}.cooldowns.${interaction.commandName}`, time)
                }

                const xp = hydromatter.functions.randint(1, 3)
                const user_xp = await hydromatter.database.get(`${interaction.user.id}.level.xp`)
                if (hydromatter.commands.get(interaction.commandName).xp) await hydromatter.database.set(`${interaction.user.id}.level.xp`, user_xp + xp)
                const new_xp = await hydromatter.database.get(`${interaction.user.id}.level.xp`)
                const level = await hydromatter.database.get(`${interaction.user.id}.level.level`)
                if (new_xp >= 100) {
                    await hydromatter.database.set(`${interaction.user.id}.level.xp`, new_xp - 100)
                    await hydromatter.database.set(`${interaction.user.id}.level.level`, level + 1)
                }
                
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