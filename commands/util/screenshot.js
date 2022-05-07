const request = require('node-superfetch');
const url = require('url');
const Command = require("../../structures/command")

module.exports = class ScreenCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'screenshot',
			category: "info",
			aliases: ['ss'],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	async run({ message, args }) {

const site = args[0]

const y = site.includes('https://www.') ? site : 'https://www.'+site;

try {
		const { body } = await request.get(`https://image.thum.io/get/width/1920/crop/675/noanimate/${y}`);
			return message.channel.send({ files: [{ attachment: body, name: 'screenshot.png' }] });
		} catch (err) {
			if (err.status === 404) return message.channel.send('Could not find any results. Invalid URL?');
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
  
}
}

