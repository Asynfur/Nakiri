const { MessageEmbed } = require('discord.js')
const pjson = require('../../package.json')
function time() {
  var time = process.uptime();
  var days = ~~(time / 86400)
  var hrs = ~~((time % 86400) / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~(time % 60);
  return days + 'd:' + hrs + 'h:' + mins + 'm:' + secs + 's'
}

const Command = require("../../structures/command")

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "info",
			category: "info",
			aliases: ['about'],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	run({ message, args }) {

    var embed = new MessageEmbed()
    embed.title = `__**~Infos~**__`;
    embed.color = 0x0080c0;
    embed.thumbnail = this.client.user.avatarURL()
    embed.addField(`**General**`,
      `**Name:** ${pjson.name}
      **Description:** ${pjson.description}
      **Author:** ${pjson.author}
      **Version:** ${pjson.version}
      **Uptime:** ${time()}`.replace(/^( *)/gm, ''), false);
      message.channel.send(embed)

  }

}