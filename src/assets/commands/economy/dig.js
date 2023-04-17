const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dig")
		.setDescription("Get some items by digging in the ground"),
	async execute(hydromatter, interaction) {
    const time = Date.now()
    
    const user_id = interaction.user.id
        
    await hydromatter.database.set(`${user_id}.cooldowns.dig`, time)

    const cash_rng = hydromatter.functions.randint(1, 1000)
    const item_rng = hydromatter.functions.randint(1, 10000)
    const result = [cash_rng == 1 ? hydromatter.functions.randint(15, 25) : cash_rng <= 10 ? hydromatter.functions.randint(7, 11) : cash_rng <= 250 ? hydromatter.functions.randint(2, 5) : hydromatter.functions.randint(0, 3), item_rng <= 5 ? 3 : item_rng <= 100 ? 2 : item_rng <= 2000 ? 1 : 0]

    const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
    const item = await hydromatter.database.get(`${user_id}.economy.inventory.002`)
    await hydromatter.database.set(`${user_id}.economy.cash`, hydromatter.bigint.add(cash, result[0]))
    await hydromatter.database.set(`${user_id}.economy.inventory.002`, hydromatter.bigint.add(item, result[1]))

    const reply_result = result[0] == 0 && result[1] == 0 ? "nothing" : result[0] == 0 ? `${result[1]} ${hydromatter.items["002"].name}` : result[1] == 0 ? `$${result[0]}` : `$${result[0]}** and **${result[1]} ${hydromatter.items["002"].name}`

    const latency = Date.now() - time
    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle(`${interaction.user.username}'s Digging Result`)
      .setDescription(`You got **${reply_result}** from digging!\n\n**__Chances__**\n__Cash__\n75% **0-3**\n24% **2-5**\n0.9% **7-11**\n0.1% **15-25**\n__Dirt__\n80% **0**\n19% **1**\n0.95% **2**\n0.05% **3**`)
      .setTimestamp()
      .setFooter({ text: `Process: ${latency}ms` })
    
    await interaction.editReply({
      embeds: [embed]
    })
	}
}