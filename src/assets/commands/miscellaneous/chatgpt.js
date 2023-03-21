const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("chatgpt")
		.setDescription("Asks ChatGPT a prompt, credits to OpenAI API")
    .addStringOption(option => 
        option.setName("model")
          .setDescription("The model of ChatGPT")
          .setRequired(true)
          .addChoices(
            {
              "name": "gpt-3.5-turbo (September 2021)",
              "value": "gpt-3.5-turbo"
            },
            {
              "name": "text-davinci-003 (June 2021)",
              "value": "text-davinci-003"
            }
          )
    )
    .addStringOption(option =>
  		  option.setName("prompt")
    			.setDescription("The prompt you wanted to ask ChatGPT")
    			.setRequired(true)
    ),
	async execute(hydromatter, interaction) {
    if (interaction.options.getString("prompt").length > 256) return await interaction.editReply({
      content: "Your prompt was longer than 256 characters, please try again with a shorter prompt"
    })

    if (hydromatter.filter(interaction.options.getString("prompt")) == true) {
      await interaction.editReply({
        content: "Your prompt contains profanity, please change your prompt"
      })
      return
    }
    
    const start_time = Date.now()

    const result = await hydromatter.chatgpt.new(interaction.options.getString("model"), interaction.options.getString("prompt"))

    const embed = new EmbedBuilder()
      .setTitle("ChatGPT Prompt")
      .setDescription(result)
      .addFields(
        {
          "name": "ChatGPT Model",
          "value": interaction.options.getString("model")
        },
        {
          "name": "Question",
          "value": interaction.options.getString("prompt")
        },
        {
          "name": "Notes",
          "value": "Reply length limit = 2048 characters\nLonger reply = longer time needed\nResults might not be accurate\nI'm currently requesting access to the newest and the most capable model, GPT-4, please wait patiently before I am able to add it to the bot"
        }
      )
      .setColor("FF0000")
      .setTimestamp()
      .setFooter({ text: `Process: ${Date.now() - start_time}ms` })
    
		await interaction.editReply({
      embeds: [embed]
    })
	},
}