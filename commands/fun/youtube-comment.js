const { MessageEmbed, MessageAttachment } = require("discord.js")
const Command = require("../../structures/command")

module.exports = class YoutubeCommentCommand extends Command {
	constructor(client) {
		super(client, {
			name: "youtube-comment",
			category: "fun",
			aliases: ['yt-comment', 'yt-com'],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
		})
	}
  async run({ message, args}) {


const yt = await this.client.img.Canvas.youtube({

username: message.author.username,
content: args.join(' '),
avatar: message.author.displayAvatarURL({ format: 'png'}),
dark: false

})


/*const yt = new this.client.img.Canvas()
.username(message.author.username)
.content(args.join(' '))
.avatar(message.author.displayAvatarURL({format: 'png'}))
*/
const img = new MessageAttachment(yt, 'yt.png')

message.channel.send(img)


    }
}