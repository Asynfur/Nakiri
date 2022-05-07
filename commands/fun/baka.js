const NekosLife = require("nekos-best.js")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
const Command = require("../../structures/command")

module.exports = class BakaCommand extends Command {
	constructor(client) {
		super(client, {
			name: "baka",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
		})
	}
  async run({ message, args}) {
await neko.init()
    
    		let member = message.mentions.users.first() || client.users.cache.get(args[0])
		if (!member) return message.channel.send("User not found, try to mention it next time")
		let img = await neko.sfw.baka()
		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setDescription(`<@${message.author.id}> has called <@${member.id}> baka.`)
			.setImage(await neko.fetchRandom("baka").results[0].url)

		message.channel.send(embed)
  }
}