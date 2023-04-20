const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("inventory")
		.setDescription("Check a user's inventory in the bot's economy system")
        .addUserOption(option =>
    		option.setName("user")
    			.setDescription("The user's inventory you want to check, leave empty if you want to check yourself")
        ),
	async execute(hydromatter, interaction) {
        const time = Date.now()

        let user = interaction.options.getMember("user")
        user = user ? user.user : interaction.user
        const user_id = user.id
        hydromatter.init_user_db(user_id)

        const latency = Date.now() - time
        embed = new EmbedBuilder()
            .setColor("FF0000")
            .setTitle(`${user.username}'s Inventory`)
            .setTimestamp()
            .setFooter({ text: `Process: ${latency}ms` })

        const inventory = await hydromatter.database.get(`${user_id}.economy.inventory`)
        let has_item = false
        for (let item in inventory) if (inventory[item] != 0) {
            embed.addFields({
                name: hydromatter.items[item].name,
                value: `Amount: **${inventory[item]}**\nID: \`${item}\``,
                inline: true
            })
            has_item = true
        }
        if (!has_item) embed.setDescription(`${user.id == interaction.user.id ? "You do" : `${user.username} does`} not have any items!`)
    
        await interaction.editReply({
          embeds: [embed]
        })
	}
}