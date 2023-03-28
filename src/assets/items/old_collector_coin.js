const price = 69420
const id = "001"

module.exports = {
    name: "Old Collector's Coin",
    id,
    price,
    async buy(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}