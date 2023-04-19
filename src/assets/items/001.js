const buy = 69420
const sell = null
const id = "001"

module.exports = {
    name: "Old Collector's Coin",
    id,
    buy,
    sell,
    async buy_item(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}