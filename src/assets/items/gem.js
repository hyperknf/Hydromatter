const price = 1000
const id = null

module.exports = {
    name: "Gem",
    id,
    price,
    async buy(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}