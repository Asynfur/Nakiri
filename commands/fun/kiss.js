const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class KissCommand extends Command {
	constructor(client) {
		super(client, {
			name: "kiss",
			category: "fun",
			aliases: ["beijar"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			disabled: false
		})
	}
	async run({ message, args }) {
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
	if (!member) return message.channel.send("User not found, try to mention it next time")
		let img = await neko.sfw.kiss()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription(`<@${message.author.id}> has kissed <@${member.id}>`)
			.setImage(img.url)

		message.channel.send(embed)
	}
}