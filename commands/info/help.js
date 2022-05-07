const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: "help",
			category: "info",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	run({ message, args }) {

		const embed = new MessageEmbed()
		embed.setColor(this.client.colors.default)
		embed.setThumbnail(this.client.user.displayAvatarURL())
	
		embed.addField(`Fun (${this.getCommmandSize("fun")})`, this.getCategory("fun", '?'))
	
		embed.addField(`Util (${this.getCommmandSize("util")})`, this.getCategory("util", '?'))
embed.addField(`Info (${this.getCommmandSize("info")})`, this.getCategory("info", '?'))


	/*	embed.addField(`Moderation (${this.getCommmandSize("mod")})`, this.getCategory("mod", '?'))*/
	
	

		message.channel.send(embed)
	}

	getCategory(category, prefix) {
		return this.client.commands.filter(c => c.config.category === category && !c.config.disabled).map(c => `\`${prefix}${c.config.name}\``).join(", ")
	}

	getCommmandSize(category) {
		return this.client.commands.filter(c => c.config.category === category).size
	}
}