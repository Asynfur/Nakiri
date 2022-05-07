const { stripIndents } = require('common-tags');
const { delay, randomRange, fetchHSUserDisplay } = require('../../utils/Util');
const words = ['fire', 'draw', 'shoot', 'bang', 'pull', 'boom'];

const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ReactionTimeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reaction-time',
			category: "fun",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	async run({ message, args }) {

    		const current = this.client.games.get(message.channel.id);
		if (current) return message.channel.send(`Please wait until the current game of \`${current.name}\` is finished.`);
		client.games.set(message.channel.id, { name: this.name });
		try {
			await message.channel.send('Get ready...');
			await delay(randomRange(1000, 30000));
			const word = words[Math.floor(Math.random() * words.length)];
			await message.channel.send(`TYPE \`${word.toUpperCase()}\` NOW!`);
			const filter = res => message.author.id === res.author.id && res.content.toLowerCase() === word;
			const now = Date.now();
			const msgs = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 30000
			});
			const newScore = Date.now() - now;
		
		

			this.client.games.delete(message.channel.id);
			if (!msgs.size) return message.channel.send('Failed to answer within 30 seconds.');
			return message.channel.send(stripIndents`
				Nice one! (Took ${newScore / 1000} seconds)
			`);
		} catch (err) {
			this.client.games.delete(message.channel.id);
			throw err;
		}
  }
}