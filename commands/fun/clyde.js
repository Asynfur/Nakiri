const Command = require("../../structures/command")
const { MessageEmbed, MessageAttachment } = require("discord.js")
module.exports = class ClydeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clyde',
			category: "fun",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	async run({ message, args }) {

const img = await this.client.img.Canvas.clyde(args.join(" "))
const a = new MessageAttachment(img, 'img.png')

message.channel.send(a)


  }
}