const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Provides a simple support interface for the bot"),
	async execute(hydromatter, interaction) {
    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle("Hydromatter Help")
      .setDescription("{} -> Required\n[] -> Optional\n() -> Option description, format: ```INPUT_TYPE,value:VALUE,not_specified:(OPTION:VALUE..)/VALUE```")
      .addFields(
        {
          "name": "Economy",
          "value": "```/balance\n/work\n/beg\n/deposit {amount(integer)}\n/withdraw {amount(integer)}\n/shop {view/buy} buy:{item(string)}```"
        },
        {
          "name": "Moderation",
          "value": "```/moderation {action(string,value:warn/mute/kick/ban)} {send_dm(boolean,value:True/False)} {target(user,value:mention/id)} [reason(string,not_specified:Not specified)] [time(integer,value:ms,not_specified:(warn/kick:null,mute/ban:inf))]```"
        },
        {
          "name": "Miscellaneous",
          "value": "```/bot_information\n/help\n/chatgpt {model(string),value:..} {prompt(string)}```"
        }
      )
      .setTimestamp()
      .setFooter({ text: `Process: 0ms` })
    
		await interaction.editReply({
          embeds: [embed]
        })
	},
}