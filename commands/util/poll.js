
const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class PollCommand extends Command {
	constructor(client) {
		super(client, {
			name: "poll",
			category: "util",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	async run({ message, args }) {
    let emoji = "🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿".split(" ");
    let choices = args.join(" ").split("-");
    let title = choices.shift() || "Poll";
    if (choices.length > 20 || choices.length < 2) return message.channel.send("Minimum amount of choices is 2 and maximum is 20");
    let poll = "";
    let i = 0;
    choices.forEach(c => {
        poll = poll + emoji[i] + " " + c + "\n";
        i++;
    });
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(poll);
    let msg = await message.channel.send(embed);
    for (i in choices) {
        await msg.react(emoji[i]);
    }
}
}
  
