const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("withdraw")
		.setDescription("Withdraw money from your bank")
        .addNumberOption(option =>
            option.setName("amount")
                .setDescription("The amount you wanted to withdraw")
                .setRequired(true)
                .setMinValue(1)
        ),
	async execute(hydromatter, interaction) {
        const time = Date.now()
        
        const user_id = interaction.user.id

        const amount = interaction.options.getNumber("amount")
        if (amount > hydromatter.database.get(`${user_id}.economy.bank`)) return interaction.editReply({
            content: "The amount you've entered was higher than what you can withdraw",
            ephemeral: true
        })
        if (Math.floor(amount) != amount) return interaction.editReply({
            content: "The amount you've entered was not an integer",
            ephemeral: true
        })
    
        hydromatter.database.set(`${user_id}.economy.bank`, hydromatter.bigint.minus(hydromatter.database.get(`${user_id}.economy.bank`), amount))
        hydromatter.database.set(`${user_id}.economy.cash`, hydromatter.bigint.add(hydromatter.database.get(`${user_id}.economy.cash`), amount))
    
        const latency = Date.now() - time
        const embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`${interaction.user.username}'s Bank`)
            .addFields(
                {
                    name: "Withdrew",
                    value: `$${amount}`,
                    inline: true
                },
                {
                    name: "Pocket",
                    value: `$${hydromatter.bigint.toNumber(hydromatter.database.get(`${user_id}.economy.cash`))}`,
                    inline: true
                },
                {
                    name: "Bank",
                    value: `$${hydromatter.bigint.toNumber(hydromatter.database.get(`${user_id}.economy.bank`))}`,
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