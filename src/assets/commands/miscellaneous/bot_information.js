const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bot_information")
		.setDescription("Returns some informations about the bot"),
	async execute(hydromatter, interaction) {
    const start_timestamp = Date.now()
    
    const clat = start_timestamp - interaction.createdTimestamp
    const apilat = Math.round(hydromatter.client.ws.ping)
    const uptime = start_timestamp - hydromatter.started

    const plat = Date.now() - start_timestamp

    const shard_guilds = await hydromatter.client.shard.fetchClientValues('guilds.cache.size')
    const guilds = String(shard_guilds.reduce((sum, a) => sum + a, 0))
    const shards = String(shard_guilds.length)
    const guild_members_primitive = await hydromatter.client.shard.broadcastEval(c => c.guilds.cache.reduce((mems, guild) => mems + guild.memberCount, 0))
    const guild_members = String(guild_members_primitive)
    
    const embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle("Hydromatter Bot Information")
      .addFields(
        {
          "name": "Uptime",
          "value": `Time since last reboot: ${hydromatter.functions.format_time(uptime)}±${clat + apilat + plat}ms\nTimestamp: <t:${Math.round(hydromatter.started / 1000)}:f>±${clat + apilat + plat}ms (<t:${Math.round(hydromatter.started / 1000)}:R>±${clat + apilat + plat}ms)`,
          "inline": true
        },
        {
          "name": "Latency",
          "value": `Client latency: ${clat}ms\nAPI latency: ${apilat}ms`,
          "inline": true
        },
        {
          "name": "Servers",
          "value": guilds,
          "inline": true
        },
        {
          "name": "Server Members",
          "value": guild_members,
          "inline": true
        },
        {
          "name": "Shards",
          "value": shards,
          "inline": true
        },
        {
          "name": "Version",
          "value": `Major: ${hydromatter.version.major}\nMinor: ${hydromatter.version.minor}\nFixes: ${hydromatter.version.fixes}`,
          "inline": true
        },
        {
          "name": "Latest Update",
          "value": `Update ${hydromatter.version.fixes}\n${hydromatter.version.log}`
        },
        {
          "name": "Source Code",
          "value": `Since Hydromatter Discord bot is currently and temporarily an open-source project, you can access the source code by clicking [here](${hydromatter.source_code})`
        }
      )
      .setTimestamp()
      .setFooter({ text: `Process: ${plat}ms` })
    
    await interaction.editReply({
      embeds: [embed]
    })
	},
}