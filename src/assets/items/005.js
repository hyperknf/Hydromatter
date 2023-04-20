const buy = 500
const sell = 100
const id = "005"

module.exports = {
    name: "Wooden Sword",
    id,
    buy,
    sell,
    async buy_item(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    },
    async sell_item(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}