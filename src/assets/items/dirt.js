const buy = null
const sell = 10
const id = "002"

module.exports = {
    name: "Dirt",
    id,
    buy,
    sell,
    async sell(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}