const { search } = require('djsdocs-generator');
const Command = require("../../structures/command")
module.exports = class DJSDocsCommand extends Command {
	constructor(client) {
		super(client, {
			name: "docs",
			category: "dev",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
		})
	}

async run({message, args}) {

const body = await search('stable', args[0])
message.channel.send({ embed: body });

  }

}