const buy = null
const sell = 25
const id = "004"

module.exports = {
    name: "Regular Fish",
    id,
    buy,
    sell,
    async sell_item(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}