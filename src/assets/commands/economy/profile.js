const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("profile")
		.setDescription("Check a user's profile in the bot's economy system")
        .addUserOption(option =>
    		option.setName("user")
    			.setDescription("The user's profile you want to check, leave empty if you want to check yourself")
        ),
	async execute(hydromatter, interaction) {
        const time = Date.now()
        
        let user = interaction.options.getMember("user")
        user = user ? user.user : interaction.user
        const user_id = user.id
        hydromatter.init_user_db(user_id)

        const levelling = await hydromatter.database.get(`${user_id}.level`)
        const level = levelling.level
        const xp = levelling.xp

        const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
        const bank = await hydromatter.database.get(`${user_id}.economy.bank`)
        const gems = await hydromatter.database.get(`${user_id}.economy.gems`)
        const hydro = await hydromatter.database.get(`${user_id}.economy.hydro`)

        let item_worth = 0
        const inventory = await hydromatter.database.get(`${user_id}.economy.inventory`)
        for (let item in inventory) {
            const amount = inventory[item]
            item_worth += (hydromatter.items[item].buy ? hydromatter.items[item].buy : hydromatter.items[item].sell ? hydromatter.items[item].sell : 0) * amount
        }
    
        const latency = Date.now() - time
        embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`${user.username}'s Profile`)
            .addFields(
                {
                    name: "Levelling",
                    value: `Level ${level}\n${xp}/100 XP\n${hydromatter.functions.process_bar(xp)}`,
                    inline: true
                },
                {
                    name: "Economy",
                    value: `Cash: $${cash}\nBank: $${bank}\nTotal: $${cash + bank}\nNet worth: $${cash + bank + item_worth}\nGems: 💎 ${gems}\nHydro: 💧 ${hydro}`,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ text: `Process: ${latency}ms` })
    
        await interaction.editReply({
          embeds: [embed]
        })
	}
}