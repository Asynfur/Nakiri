
const { resolvePermissions } = require('../../utils/discord.js');

const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "user",
			category: "info",
			aliases: ['userinfo', 'user-info', 'whois'],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	run({ message, args }) {


const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const user = member.user;

const activities = [];

   let customStatus;
    for (const activity of member.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'LISTENING':
          if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
          else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
          break;
        case 'WATCHING':
          activities.push(`Watching **${activity.name}**`);
          break;
        case 'STREAMING':
          activities.push(`Streaming **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          break;
      }
    }

const emojis = {
  HOUSE_BALANCE: '<:balance:725345746223759461>',
  HOUSE_BRILLIANCE: '<:brilliance:725345746857230346>',
  HOUSE_BRAVERY: '<:bravery:725345754931003462>',
  VERIFIED_DEVELOPER: '<:dev:725345745267458129>'
}
const connection = {
  online: '<a:online_gif:725348881436639343>',
  idle: '<a:idle_gif:725349180062695486>',
  dnd: '<a:dnd_gif:725348880857694228>',
  invisible: '<a:invisible_gif:725348881503879208>'
}
var game;
if (!user.presence.game){
game = 'No game'
} else {
  
}

const embed = new MessageEmbed()
.setColor(member.roles.color !== null ? member.roles.color.color : 'RANDOM')
.setThumbnail(user.displayAvatarURL({ dynamic: true}))
.addField("Data", `Tag: \`${user.tag}\`\nID: \`${user.id}\``)
.addField("Badges", user.flags.toArray().length > 1 ? user.flags.toArray().map(x => emojis[x]).join(" ") : 'No badges' )
.addField("Status", `Connection: \`${user.presence.status} \` ${connection[user.presence.status]}`)
if (message.guild){
  try {
/*embed.addField("Dates", `Created: \`${user.createdAt.toLocaleDateString()} ago: ${client.utils.ago(user.createdTimestamp)}\`\nJoined: \`${member.joinedAt.toLocaleDateString()} ago: ${thiclient.utils.ago(member.joinedTimestamp)}\``)*/

embed.addField("Permissions", "`"+resolvePermissions((member.permissions.toArray())).join("`, `")+"`")

} catch {

embed.setFooter('Failed to resolve member, showing basic user information instead.');
}
    if (activities.length > 0) embed.setDescription(activities.join('\n'));
    if (customStatus) embed.spliceFields(0, 0, { name: 'Custom Status', value: customStatus});
message.channel.send(embed)

}

}
}