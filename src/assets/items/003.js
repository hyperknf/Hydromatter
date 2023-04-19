const buy = null
const sell = 15
const id = "003"

module.exports = {
    name: "Trash",
    id,
    buy,
    sell,
    async sell_item(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}