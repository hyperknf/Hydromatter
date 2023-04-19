const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("deposit")
		.setDescription("Deposit money to your bank")
        .addNumberOption(option =>
            option.setName("amount")
                .setDescription("The amount you wanted to deposit")
                .setRequired(true)
                .setMinValue(1)
        ),
	async execute(hydromatter, interaction) {
        const time = Date.now()
        
        const user_id = interaction.user.id

        const amount = interaction.options.getNumber("amount")
        let cash = await hydromatter.database.get(`${user_id}.economy.cash`)
        let bank = await hydromatter.database.get(`${user_id}.economy.bank`)
        if (amount > cash) return interaction.editReply({
            content: "The amount you've entered was higher than what you can deposit",
            ephemeral: true
        })
        if (Math.floor(amount) != amount) return interaction.editReply({
            content: "The amount you've entered was not an integer",
            ephemeral: true
        })
    
        await hydromatter.database.set(`${user_id}.economy.cash`, cash - amount)
        await hydromatter.database.set(`${user_id}.economy.bank`, bank + amount)

        cash = await hydromatter.database.get(`${user_id}.economy.cash`)
        bank = await hydromatter.database.get(`${user_id}.economy.bank`)
        const latency = Date.now() - time
        const embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`${interaction.user.username}'s Bank`)
            .addFields(
                {
                    name: "Deposited",
                    value: `$${amount}`,
                    inline: true
                },
                {
                    name: "Pocket",
                    value: `$${cash}`,
                    inline: true
                },
                {
                    name: "Bank",
                    value: `$${bank}`,
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