const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class YearCommand extends Command {
	constructor(client) {
		super(client, {
			name: "year-progress",
			category: "info",
			aliases: ['year'],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	run({ message, args }) {
    	const today = new Date();
		const start = new Date(today.getFullYear(), 0, 1);
		const end = new Date(today.getFullYear() + 1, 0, 1);
		const percent = (Math.abs(today - start) / Math.abs(end - start)) * 100;
		return message.channel.send(`The year ${today.getFullYear()} is **${percent}%** complete!`);
	}
  }
