const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("fish")
		.setDescription("Get some items by fishing in the water"),
	async execute(hydromatter, interaction) {
    const time = Date.now()
    
    const user_id = interaction.user.id

    const cash_rng = hydromatter.functions.randint(1, 5)
    const item_rng = hydromatter.functions.randint(1, 100)
    const item2_rng = hydromatter.functions.randint(1, 1000)
    const result = [cash_rng == 1 ? hydromatter.functions.randint(1, 5) : 0, item_rng <= 2 ? 2 : item_rng <= 25 ? 1 : 0, item2_rng == 1 ? 2 : item2_rng <= 70 ? 1 : 0]

    const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
    const item = await hydromatter.database.get(`${user_id}.economy.inventory.003`)
    const item2 = await hydromatter.database.get(`${user_id}.economy.inventory.004`)
    await hydromatter.database.set(`${user_id}.economy.cash`, cash + result[0])
    await hydromatter.database.set(`${user_id}.economy.inventory.003`, item + result[1])
    await hydromatter.database.set(`${user_id}.economy.inventory.004`, item2 + result[2])

    const latency = Date.now() - time
    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle(`${interaction.user.username}'s Fishing Result`)
      .setDescription(`You got **$${result[0]}**, **${result[1]} ${hydromatter.items["003"].name}** and **${result[2]} ${hydromatter.items["004"].name}** from fishing!`)
      .addFields(
          {
              name: "Cash",
              value: "80% **0**\n20% **1-5**",
              inline: true
          },
          {
              name: hydromatter.items["003"].name,
              value: "75% **0**\n23% **1**\n2% **2**",
              inline: true
          },
          {
              name: hydromatter.items["004"].name,
              value: "93% **0**\n6.9% **1**\n0.1% **2**",
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