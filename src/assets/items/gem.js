const buy = 1000
const sell = null
const id = null

module.exports = {
    name: "Gem",
    id,
    buy,
    sell,
    async buy_item(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}