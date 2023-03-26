const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("developer")
		.setDescription("Developer only command")
    .addStringOption(option => 
        option.setName("command")
          .setDescription("Command")
          .setRequired(true)
    )
    .addStringOption(option =>
  		  option.setName("value")
    			.setDescription("Value")
    ),
	async execute(hydromatter, interaction) {
    if (interaction.user.id != "655678656970227714") return await interaction.editReply({
      content: "You are not authorized to use this command",
      ephemeral: true
    })
    
    const start_time = Date.now()

    let result
    let send_reply = true

    if (!interaction.options.getString("value")) {
        if (!(interaction.options.getString("command").toLowerCase() == "rickroll")) {
            return await interaction.editReply({
                content: "That command requires the \"value\" option",
                ephemeral: true
            })
        }
    }

    if (interaction.options.getString("command").toLowerCase() == "eval") {
      try {
        let stdout = " "
        
        await eval(`(async () => { const stdarray = []\n ${interaction.options.getString("value")}\nfor (let i = 0; i <= stdarray.length - 1; i++) stdout += "\\n" + String(stdarray[i]) })()`.replace(/console.log/g, "stdarray.push").replace(/hydromatter.log/g, "stdarray.push").replace(/interaction.reply/g, "interaction.editReply"))
        result = `Success:\n\`\`\`${interaction.options.getString("value")}\`\`\``
        result += `\nCode Output:\n\`\`\`${stdout}\`\`\``
      } catch (exception) {
        result = `Failed:\n${exception}`
      }
    } else if (interaction.options.getString("command").toLowerCase() == "log") {
      try {
        hydromatter.log(interaction.options.getString("value"))
        result = `Success:\n\`\`\`${interaction.options.getString("value")}\`\`\``
      } catch (exception) {
        result = `Failed:\n${exception}`
      }
    } else if (interaction.options.getString("command").toLowerCase() == "ban") {
      const value_arg = interaction.options.getString("value")
      if (isNaN(Number(value_arg))) {
        result = `Failed:\n\`\`\`Invalid user ID\`\`\``
      } else if (typeof hydromatter.database.get(`${value_arg}.banned`) == "undefined") {
        result = `Failed:\n\`\`\`User not in database\`\`\``
      } else {
        try {
          if (hydromatter.database.get(`${value_arg}.banned`) == 0) {
            hydromatter.database.set(`${value_arg}.banned`, 1)
            result = `Success:\n\`\`\`User banned\`\`\``
          } else result = `Failed:\n\`\`\`User already banned\`\`\``
        } catch (exception) {
          result = `Failed:\n\`\`\`${exception}\`\`\``
        }
      }
    } else if (interaction.options.getString("command").toLowerCase() == "unban") {
      const value_arg = interaction.options.getString("value")
      if (isNaN(Number(value_arg))) {
        result = `Failed:\n\`\`\`Invalid user ID\`\`\``
      } else if (typeof hydromatter == "undefined") {
        result = `Failed:\n\`\`\`User not in database\`\`\``
      } else {
        try {
          if (hydromatter.database.get(`${value_arg}.banned`) == 1) {
            hydromatter.database.set(`${value_arg}.banned`, 0)
            result = `Success:\n\`\`\`User unbanned\`\`\``
          } else result = `Failed:\n\`\`\`User not banned\`\`\``
        } catch (exception) {
          result = `Failed:\n\`\`\`${exception}\`\`\``
        }
      }
    } else if (interaction.options.getString("command").toLowerCase() == "rickroll") {
        const troll = new EmbedBuilder()
            .setTitle("Rickroll")
            .setColor("FF0000")
            .setDescription("Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you")
            .setFooter({text:"You just got rickrolled"})
        await interaction.editReply({
            content: "Sent!",
            ephemeral: true
        })
        await interaction.channel.send({
            embeds: [troll]
        })
        send_reply = false
    } else result = "Failed:\n\`\`\`Invalid command\`\`\`"

    if (!send_reply) return

    const embed = new EmbedBuilder()
      .setTitle("ChatGPT Prompt")
      .addFields(
        {
          "name": "Command",
          "value": `\`\`\`${interaction.options.getString("command")}\`\`\``
        },
        {
          "name": "Value",
          "value": `\`\`\`${interaction.options.getString("value")}\`\`\``
        },
        {
          "name": "Result",
          "value": `${result}`
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