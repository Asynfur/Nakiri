
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const Command = require("../../structures/command")
module.exports = class AvatarFusionCommand extends Command {
	constructor(client) {
		super(client, {
			name: "avatar-fusion",
			category: "fun",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
async	run({ message, args }) {

const overlay = message.mentions.users.first() || this.client.users.cache.get(args[0])
const base = message.author;

  	const baseAvatarURL = base.displayAvatarURL({ format: 'png', size: 512 });
		const overlayAvatarURL = overlay.displayAvatarURL({ format: 'png', size: 512 });
		try {
			const baseAvatarData = await request.get(baseAvatarURL);
			const baseAvatar = await loadImage(baseAvatarData.body);
			const overlayAvatarData = await request.get(overlayAvatarURL);
			const overlayAvatar = await loadImage(overlayAvatarData.body);
			const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
			const ctx = canvas.getContext('2d');
			ctx.globalAlpha = 0.5;
			ctx.drawImage(baseAvatar, 0, 0);
			ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'avatar-fusion.png' }] });
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
}