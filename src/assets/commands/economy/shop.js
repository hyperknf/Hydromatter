const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("shop")
		.setDescription("Check the shop")
        .addSubcommand(subcommand =>
            subcommand.setName('view')
                .setDescription('View the shop')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('buy')
                .setDescription('Buy an item from the shop')
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('The item you wanted to buy')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('amount')
                        .setDescription('The amount of item you wanted to buy')
                        .setRequired(true)
                )
        ),
	async execute(hydromatter, interaction) {
        const subcommand = interaction.options.getSubcommand()
        if (subcommand == "view") {
            const time = Date.now()
                
            const category = interaction.options.getString("category")
            const user_id = interaction.user.id
        
            const cash = await hydromatter.database.get(`${user_id}.economy.cash`)
            
            embed = new EmbedBuilder()
                .setColor("FF0000")
                .setTitle(`Shop`)
                .setDescription(`**You have $${hydromatter.bigint.toNumberString("suffix", cash)} in your pocket right now**`)
                .setTimestamp()
            for (let item in hydromatter.items) embed.addFields({
                name: hydromatter.items[item].name,
                value: `$${hydromatter.bigint.toNumberString("suffix", hydromatter.bigint.new(hydromatter.items[item].price))}`,
                inline: true
            })
            embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
            
            await interaction.editReply({
                embeds: [embed]
            })
        } else if (subcommand == "buy") {
            await interaction.editReply({
                content: "Coming soon!",
                ephemeral: true
            })
        }
	}
}