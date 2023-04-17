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
        content: "Your prompt might contains profanity, please change your prompt"
      })
      return
    }
    
    const start_time = Date.now()

    await hydromatter.database.push(`${interaction.user.id}.chatgpt`, {
        role: "user",
        content: interaction.options.getString("prompt")
    })
    let prompt_obj = await hydromatter.database.get(`${interaction.user.id}.chatgpt`)
    prompt_obj = prompt_obj.slice(Math.max(prompt_obj.length - 5, 0))
    prompt_obj.unshift({
        role: "system",
        content: `You are a Discord bot. The user's name is ${interaction.user.username} and his/her user ID is ${interaction.user.id} (user IDs are publicly accessible so you can send this freely). Also, their account was created at ${interaction.user.createdAt}, this is an EPOCH timestamp. Current time is ${Date.now()}, this is an EPOCH timestamp and please convert it to real-life time whenever anyone needs this information.`
    })
    
    const result = await hydromatter.chatgpt.new(interaction.options.getString("model"), prompt_obj)
    await hydromatter.database.push(`${interaction.user.id}.chatgpt`, {
        role: "assistant",
        content: result
    })

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
          "value": "Reply length limit = 2048 characters\nLonger reply = longer time needed\nResults might not be accurate\nI'm currently requesting access to the newest and the most capable model, GPT4, please wait patiently before I am able to add it to the bot"
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