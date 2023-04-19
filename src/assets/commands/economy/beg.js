const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("beg")
		.setDescription("Get some money by begging"),
	async execute(hydromatter, interaction) {
    const time = Date.now()
    
    const user_id = interaction.user.id

    let income = hydromatter.functions.randint(0, 7)

    const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
    await hydromatter.database.set(`${user_id}.economy.cash`, cash + income)

    const latency = Date.now() - time
    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle(`${interaction.user.username}'s Beg Result`)
      .setDescription(`You got **$${income}** from begging`)
      .setTimestamp()
      .setFooter({ text: `Process: ${latency}ms` })
    
    await interaction.editReply({
      embeds: [embed]
    })
	},
    xp: true
}