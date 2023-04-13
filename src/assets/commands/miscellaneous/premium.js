const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("premium")
		.setDescription("Shows some simple information on the bot's premium payment"),
	async execute(hydromatter, interaction) {
        const is_patron = await hydromatter.database.get(`${interaction.user.id}.patreon`)
            
        const embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle("Hydromatter Premium")
            .setDescription(
                `Your current subscription status:\n**${(
                    is_patron == 0 ? "No subscription" :
                    is_patron == 1 ? "$5 subscription (Basic)" :
                    is_patron == 2 ? "$10 subscription (Premium)" :
                    "Error"
                ) + (
                    hydromatter.developers.includes(interaction.user.id) ? "\nDeveloper account" : ""
                )}**\nVisit [here](https://www.patreon.com/Hydromatter) for more information or purchasing`
            )
            .addFields(
                {
                    name: "Supporter (Basic)",
                    value: "` - ` Faster cooldown time applied to all commands\n**$5/Month**"
                },
                {
                    name: "Supporter (Premium)",
                    value: "` - ` Access to beta features\n` - ` No cooldown time on all commands\n**$10/Month**"
                }
            )
            .setFooter({
                text: "Process: 0ms"
            })
            .setTimestamp()
        
    	await interaction.editReply({
            embeds: [embed]
        })
	},
}