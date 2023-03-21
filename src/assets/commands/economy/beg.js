const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("beg")
		.setDescription("Get some money by begging"),
	async execute(hydromatter, interaction) {
    const time = Date.now()
    
    const user_id = interaction.user.id

    if (time - hydromatter.database.get(`${user_id}.cooldowns.beg`) < hydromatter.cooldowns.beg) {
      const latency = Date.now() - time
      
      const embed = new EmbedBuilder()
        .setColor("FF0000")
        .setTitle("The command is still on cooldown")
        .setDescription(`Please try again <t:${Math.round((hydromatter.database.get(`${user_id}.cooldowns.beg`) + hydromatter.cooldowns.beg) / 1000)}:R>`)
        .setTimestamp()
        .setFooter({ text: `Process: ${latency}ms` })
      
      return interaction.editReply({
        embeds: [embed],
        ephemeral: true
      })
    }
    hydromatter.database.set(`${user_id}.cooldowns.beg`, time)

    let income = hydromatter.functions.randint(0, 7)

    hydromatter.database.set(`${user_id}.economy.cash`, hydromatter.bigint.add(hydromatter.database.get(`${user_id}.economy.cash`), hydromatter.bigint.new(income)))

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
	}
}