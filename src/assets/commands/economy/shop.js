const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("shop")
		.setDescription("Check the shop")
        .addSubcommand(subcommand =>
            subcommand.setName('view')
                .setDescription('View the shop')
                .addStringOption(option =>
                    option.setName("item_id")
                        .setDescription("The item ID of the item you wanted to check, leave empty if you don't want to check any items")
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('buy')
                .setDescription('Buy an item from the shop')
                .addStringOption(option =>
                    option.setName('item_id')
                        .setDescription('The ID of the item you wanted to buy')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('amount')
                        .setDescription('The amount of item you wanted to buy')
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('sell')
                .setDescription('Sell an item to the shop')
                .addStringOption(option =>
                    option.setName('item_id')
                        .setDescription('The ID of the item you wanted to sell')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('amount')
                        .setDescription('The amount of item you wanted to sell')
                )
        ),
	async execute(hydromatter, interaction) {
        const subcommand = interaction.options.getSubcommand()
        if (subcommand == "view") {
            const time = Date.now()
                
            const item = interaction.options.getString("item_id")
            const user_id = interaction.user.id
        
            const cash = await hydromatter.database.get(`${user_id}.economy.cash`)

            if (!item) {
                embed = new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle(`Shop`)
                    .setDescription(`**You have $${cash} in your pocket right now**`)
                    .setTimestamp()
                for (let item in hydromatter.items) embed.addFields({
                    name: hydromatter.items[item].name,
                    value: `Buy: ${hydromatter.items[item].buy ? `$${hydromatter.items[item].buy}` : "N/A"}\nSell: ${hydromatter.items[item].sell ? `$${hydromatter.items[item].sell}` : "N/A"}\nID: ${hydromatter.items[item].id ? hydromatter.items[item].id : "N/A"}`,
                    inline: true
                })
                embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
            } else {
                let has_item = false
                for (let thing in hydromatter.items) if (hydromatter.items[thing].id == item) has_item = true
                if (has_item) {
                    const the_item = hydromatter.items[item]
                    embed = new EmbedBuilder()
                        .setColor("FF0000")
                        .setTitle(`Shop`)
                        .addFields(
                            {
                                name: "Name",
                                value: the_item.name,
                                inline: true
                            },
                            {
                                name: "Buy Price",
                                value: the_item.buy ? `$${the_item.buy}` : "N/A",
                                inline: true
                            },
                            {
                                name: "Sell Price",
                                value: the_item.sell ? `$${the_item.sell}` : "N/A",
                                inline: true
                            }
                        )
                        .setTimestamp()
                    embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
                } else {
                    embed = new EmbedBuilder()
                        .setColor("FF0000")
                        .setTitle(`Shop`)
                        .setDescription("An item with that ID does not exist!")
                        .setTimestamp()
                    embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
                }
            }
            
            await interaction.editReply({
                embeds: [embed]
            })
        } else if (subcommand == "buy") {
            const time = Date.now()
            const item_id = interaction.options.getString("item_id")
            let has_item = false
            for (let thing in hydromatter.items) if (hydromatter.items[thing].id == item_id) has_item = true
            if (!has_item) {
                const embed = new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle(`Shop`)
                    .setDescription("An item with that ID does not exist!")
                    .setTimestamp()
                embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
                await interaction.editReply({
                    embeds: [embed]
                })
                return
            }
            if (!hydromatter.items[item_id].buy_item) {
                const embed = new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle(`Shop`)
                    .setDescription("You cannot buy this item!")
                    .setTimestamp()
                embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
                await interaction.editReply({
                    embeds: [embed]
                })
                return
            }
            return hydromatter.items[item_id].buy_item(hydromatter, interaction)
        } else if (subcommand == "sell") {
            const time = Date.now()
            const item_id = interaction.options.getString("item_id")
            let has_item = false
            for (let thing in hydromatter.items) if (hydromatter.items[thing].id == item_id) has_item = true
            if (!has_item) {
                const embed = new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle(`Shop`)
                    .setDescription("An item with that ID does not exist!")
                    .setTimestamp()
                embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
                await interaction.editReply({
                    embeds: [embed]
                })
                return
            }
            if (!hydromatter.items[item_id].sell_item) {
                const embed = new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle(`Shop`)
                    .setDescription("You cannot sell this item!")
                    .setTimestamp()
                embed.setFooter({ text: `Process: ${Date.now() - time}ms` })
                await interaction.editReply({
                    embeds: [embed]
                })
                return
            }
            return hydromatter.items[item_id].sell_item(hydromatter, interaction)
        }
	}
}