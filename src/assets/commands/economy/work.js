const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("work")
		.setDescription("Get some money by working"),
	async execute(hydromatter, interaction) {
        const time = Date.now()
        
        const user_id = interaction.user.id
    
        const income = hydromatter.functions.randint(150, 250)

        const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
        await hydromatter.database.set(`${user_id}.economy.cash`, hydromatter.bigint.add(cash, income))
    
        const latency = Date.now() - time
        const embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`${interaction.user.username}'s Work Salary`)
            .setDescription(`You got **$${income}** from working`)
            .setTimestamp()
            .setFooter({ text: `Process: ${latency}ms` })
        
        await interaction.editReply({
          embeds: [embed]
        })
	}
}