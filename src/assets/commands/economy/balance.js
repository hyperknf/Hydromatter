const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("balance")
		.setDescription("Check your balance in the bot's economy system"),
	async execute(hydromatter, interaction) {
        const time = Date.now()
        
        const category = interaction.options.getString("category")
        const user_id = interaction.user.id

        const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
        const bank = await hydromatter.database.get(`${user_id}.economy.bank`)
        const gems = await hydromatter.database.get(`${user_id}.economy.gems`)
        const hydro = await hydromatter.database.get(`${user_id}.economy.hydro`)
    
        const latency = Date.now() - time
        embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`Inventory: ${interaction.user.username}'s Balance`)
            .addFields(
                {
                    "name": "Cash",
                    "value": `🪙 ${typeof hydromatter.bigint.toNumberString("suffix", cash) == "number" ? Math.round(hydromatter.bigint.toNumberString("suffix", cash)) : (hydromatter.bigint.toNumberString("suffix", cash))}`
                },
                {
                    "name": "Bank",
                    "value": `🪙 ${typeof hydromatter.bigint.toNumberString("suffix", bank) == "number" ? Math.round(hydromatter.bigint.toNumberString("suffix", bank)) : (hydromatter.bigint.toNumberString("suffix", bank))}`
                },
                {
                    "name": "Total",
                    "value": `🪙 0`
                },
                {
                    "name": "Net Worth",
                    "value": `🪙 0`
                },
                {
                    "name": "Gems",
                    "value": `💎 ${typeof hydromatter.bigint.toNumberString("suffix", gems) == "number" ? Math.round(hydromatter.bigint.toNumberString("suffix", gems)) : (hydromatter.bigint.toNumberString("suffix", gems))}`
                },
                {
                    "name": "Hydro",
                    "value": `💧 ${typeof hydromatter.bigint.toNumberString("suffix", hydro) == "number" ? Math.round(hydromatter.bigint.toNumberString("suffix", hydro)) : (hydromatter.bigint.toNumberString("suffix", hydro))}`
                }
            )
            .setTimestamp()
            .setFooter({ text: `Process: ${latency}ms` })
    
        await interaction.editReply({
          embeds: [embed]
        })
	}
}