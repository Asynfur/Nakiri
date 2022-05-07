const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class RankCommand extends Command {
	constructor(client) {
		super(client, {
			name: "rank",
			category: "info",
			aliases: ['level'],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
async	run({ message, args }) {




    }
    }