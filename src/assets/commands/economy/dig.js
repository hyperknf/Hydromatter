const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dig")
		.setDescription("Get some items by digging in the ground"),
	async execute(hydromatter, interaction) {
    const time = Date.now()
    
    const user_id = interaction.user.id

    const cash_rng = hydromatter.functions.randint(1, 1000)
    const item_rng = hydromatter.functions.randint(1, 10000)
    const result = [cash_rng == 1 ? hydromatter.functions.randint(15, 25) : cash_rng <= 10 ? hydromatter.functions.randint(7, 11) : cash_rng <= 150 ? hydromatter.functions.randint(2, 5) : cash_rng <= 500 ? hydromatter.functions.randint(0, 3) : 0, item_rng <= 5 ? 3 : item_rng <= 100 ? 2 : item_rng <= 2000 ? 1 : 0]

    const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
    const item = await hydromatter.database.get(`${user_id}.economy.inventory.002`)
    await hydromatter.database.set(`${user_id}.economy.cash`, cash + result[0])
    await hydromatter.database.set(`${user_id}.economy.inventory.002`, item + result[1])

    const latency = Date.now() - time
    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle(`${interaction.user.username}'s Digging Result`)
      .setDescription(`You got **$${result[0]}** and **${result[1]} ${hydromatter.items["002"].name}** from digging!`)
      .addFields(
          {
              name: "Cash",
              value: "50% **0**\n35% **0-3**\n14% **2-5**\n0.9% **7-11**\n0.1% **15-25**",
              inline: true
          },
          {
              name: hydromatter.items["002"].name,
              value: "80% **0**\n19% **1**\n0.95% **2**\n0.05% **3**",
              inline: true
          }
      )
      .setTimestamp()
      .setFooter({ text: `Process: ${latency}ms` })
    
    await interaction.editReply({
      embeds: [embed]
    })
	},
    xp: true
}