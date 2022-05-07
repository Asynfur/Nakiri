const { MessageEmbed, MessageAttachment } = require("discord.js")
const Command = require("../../structures/command")

module.exports = class TriggeredCommand extends Command {
	constructor(client) {
		super(client, {
			name: "triggered",
			category: "fun",
			aliases: ['tig'],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
		})
	}
  async run({ message, args}) {


    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await this.client.img.Canvas.trigger(avatar);
        let attachment = new MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);

  }
}