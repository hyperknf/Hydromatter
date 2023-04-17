const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dig")
		.setDescription("Get some items by digging in the ground"),
	async execute(hydromatter, interaction) {
    const time = Date.now()
    
    const user_id = interaction.user.id
        
    await hydromatter.database.set(`${user_id}.cooldowns.dig`, time)

    const item_rng = hydromatter.functions.randint(1, 100)
    const result = [hydromatter.functions.randint(0, 3), item_rng == 1 ? 2 : item_rng <= 20 ? 1 : 0]

    const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
    const item = await hydromatter.database.get(`${user_id}.economy.inventory.002`)
    await hydromatter.database.set(`${user_id}.economy.cash`, hydromatter.bigint.add(cash, result[0]))
    await hydromatter.database.set(`${user_id}.economy.inventory.002`, hydromatter.bigint.add(item, result[1]))

    const reply_result = result[0] == 0 && result[1] == 0 ? "nothing" : result[0] == 0 ? `${result[1]} ${hydromatter.items["002"].name}` : result[1] == 0 ? `$${result[0]}` : `$${result[0]}** and **${result[1]} ${hydromatter.items["002"].name}`

    const latency = Date.now() - time
    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle(`${interaction.user.username}'s Digging Result`)
      .setDescription(`You got **${reply_result}** from digging!\n\n**__Chances__**\n__Cash__\n**0-3**\n__Dirt__\n80% **0**\n19% **1**\n1% **2**`)
      .setTimestamp()
      .setFooter({ text: `Process: ${latency}ms` })
    
    await interaction.editReply({
      embeds: [embed]
    })
	}
}