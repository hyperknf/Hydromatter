const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("balance")
		.setDescription("Check your balance in the bot's economy system"),
	async execute(hydromatter, interaction) {
        const time = Date.now()
        
        const category = interaction.options.getString("category")
        const user_id = interaction.user.id
    
        const latency = Date.now() - time
        embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`Inventory: ${interaction.user.username}'s Balance`)
            .addFields(
                {
                    "name": "Cash",
                    "value": `🪙 ${(typeof hydromatter.bigint.toNumberString("suffix", hydromatter.database.get(`${user_id}.economy.cash`))) == "number" ? Math.round((hydromatter.bigint.toNumberString("suffix", hydromatter.database.get(`${user_id}.economy.cash`)))) : (hydromatter.bigint.toNumberString("suffix", hydromatter.database.get(`${user_id}.economy.cash`)))}`
                },
                {
                    "name": "Bank",
                    "value": `🪙 ${Math.round(hydromatter.bigint.toNumberString("suffix", hydromatter.database.get(`${user_id}.economy.bank`)))}`
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
                    "value": `💎 ${hydromatter.bigint.toNumberString("whole", hydromatter.database.get(`${user_id}.economy.gems`))}`
                },
                {
                    "name": "Hydro",
                    "value": `💧 ${hydromatter.bigint.toNumberString("whole", hydromatter.database.get(`${user_id}.economy.hydro`))}`
                }
            )
            .setTimestamp()
            .setFooter({ text: `Process: ${latency}ms` })
    
        await interaction.editReply({
          embeds: [embed]
        })
	}
}