const buy = 100000
const sell = null
const id = null

module.exports = {
    name: "Hydro",
    id,
    buy,
    sell,
    async buy(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}