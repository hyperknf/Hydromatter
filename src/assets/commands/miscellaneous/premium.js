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
                    is_patron == 3 ? "$20 subscription (Superior)" :
                    is_patron == 4 ? "$50 subscription (Super)" :
                    "Error"
                ) + (
                    hydromatter.developers.includes(interaction.user.id) ? "\nDeveloper account" : ""
                )}**\nVisit [here](https://www.patreon.com/Hydromatter) for more information or purchasing`
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