const buy = 1000
const sell = null
const id = null

module.exports = {
    name: "Gem",
    id,
    buy,
    sell,
    async buy(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}