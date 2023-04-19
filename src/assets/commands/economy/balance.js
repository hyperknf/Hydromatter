const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("balance")
		.setDescription("Check your balance in the bot's economy system")
        .addUserOption(option =>
    		option.setName("user")
    			.setDescription("The user's balance you want to check, leave empty if you want to check yourself")
        ),
	async execute(hydromatter, interaction) {
        const time = Date.now()
        
        let user = interaction.options.getMember("user")
        user = user ? user.user : interaction.user
        const user_id = user.id
        hydromatter.init_user_db(user_id)

        const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
        const bank = await hydromatter.database.get(`${user_id}.economy.bank`)
        const gems = await hydromatter.database.get(`${user_id}.economy.gems`)
        const hydro = await hydromatter.database.get(`${user_id}.economy.hydro`)
    
        const latency = Date.now() - time
        embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`${user.username}'s Balance`)
            .addFields(
                {
                    "name": "Cash",
                    "value": `$${cash}`
                },
                {
                    "name": "Bank",
                    "value": `$${bank}`
                },
                {
                    "name": "Total",
                    "value": `$${cash + bank}`
                },
                {
                    "name": "Net Worth",
                    "value": `$${cash + bank}`
                },
                {
                    "name": "Gems",
                    "value": `💎 ${gems}`
                },
                {
                    "name": "Hydro",
                    "value": `💧 ${hydro}`
                }
            )
            .setTimestamp()
            .setFooter({ text: `Process: ${latency}ms` })
    
        await interaction.editReply({
          embeds: [embed]
        })
	}
}