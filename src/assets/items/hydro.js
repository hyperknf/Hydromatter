const price = 100000
const id = null

module.exports = {
    name: "Hydro",
    id,
    price,
    async buy(hydromatter, interaction, amount) {
        return interaction.editReply({
            content: "Coming soon!"
        })
    }
}