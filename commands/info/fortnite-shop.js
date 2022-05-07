const Canvas = require("discord-canvas")
 const shop = new Canvas.FortniteShop()
 const { MessageAttachment } = require("discord.js")
const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class FortniteShopCommand extends Command {
	constructor(client) {
		super(client, {
			name: "fortnite-shop",
			category: "info",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	async run({ message, args }) {

const image = await shop
  .setToken(process.env.fnbr)
  .toAttachment();

  let attachment = new MessageAttachment(image, "FortniteShop.png");

  message.channel.send(attachment)


  }
}