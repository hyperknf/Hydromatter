const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
		.setName("moderation")
		.setDescription("Preforms different moderating actions, like mute, kick, or ban")
    .addStringOption(option =>
		  option.setName("action")
  			.setDescription("Determines whether to mute, kick, or ban")
  			.setRequired(true)
  			.addChoices(
          {
            "name": "warn",
            "value": "warn"
          },
  				{
            "name": "mute", 
            "value": "mute"
          },
          {
            "name": "kick",
            "value": "kick"
          },
          {
            "name": "ban",
            "value": "ban"
          }
			  )
    )
    .addBooleanOption(option =>
		  option.setName("send_dm")
  			.setDescription("Determines wheher to send direct message to the target or not")
  			.setRequired(true)
    )
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The target of the action, enter user ID, or mention (@) the user here")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("The reason of the action")
    )
    .addIntegerOption(option =>
      option.setName("time")
        .setDescription("The time in milliseconds, do not specify for permanent actions")
    )
    .setDMPermission(false),
  async execute(hydromatter, interaction) {
    await interaction.reply({
      content: "Coming soon",
      ephemeral: true
    })
  }
}