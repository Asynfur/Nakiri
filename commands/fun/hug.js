const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class HugCommand extends Command {
	constructor(client) {
		super(client, {
			name: "hug",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			disabled: false
		})
	}
	async run({ message, args }) {
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
			if (!member) return message.channel.send("User not found, try to mention it next time")
		let img = await neko.sfw.hug()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription(`<@${message.author.id}> has hugged <@${member.id}>`)
			.setImage(img.url)

		message.channel.send(embed)
	}
}