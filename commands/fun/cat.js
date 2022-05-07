const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: "cat",
			category: "fun",
			aliases: ["gato", "kitty"],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
		})
	}
	async run({ message, args}) {
		let img = await neko.sfw.meow()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription("🐱")
			.setImage(img.url)

		message.channel.send(embed)
	}
}