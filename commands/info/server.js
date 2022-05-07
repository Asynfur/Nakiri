const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class GuildCommand extends Command {
	constructor(client) {
		super(client, {
			name: "server",
			category: "info",
			aliases: ['guild', 'serverinfo', 'server-info'],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
async	run({ message, args }) {


   let features = { 
        ANIMATED_ICON: "Animated icon",
        BANNER: "Server banner",
        COMMERCE: "Channel with shop",
        DISCOVERABLE: "Discord Discovery List",
        FEATURABLE: "Server featurable",
        INVITE_SPLASH: "Invite splash",
        PUBLIC: "Server public",
        NEWS: "Channel with news",
        PARTNERED: "Server partner",
        VANITY_URL: "Custom invite",
        VERIFIED: "Server verified",
        VIP_REGIONS: "Region V.I.P"
    };

    let nivel = { 
        0: "Level 0",
        1: "Level 1",
        2: "Level 2",
        3: "Level 3"
    };
var owner;

if (!message.guild.owner) {

  owner = await message.guild.members.fetch(message.guild.ownerID)
} else {
owner = message.guild.owner

}
    const embed = new MessageEmbed()
        .setColor(message.guild.roles.highest.color)
        .setAuthor("Owner: " + owner.user.tag, owner.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(!message.guild.splashURL({ size: 2048, dynamic: true })
            ? message.guild.iconURL({ size: 2048, dynamic: true })
            : message.guild.splashURL({ size: 2048, dynamic: true }))
        .addField("Creating date", `${message.guild.createdAt.toLocaleDateString()} ago: ${this.client.utils.ago(message.guild.createdTimestamp)}`)
        .addField('Boost level', nivel[message.guild.premiumTier], true)
        .addField('Members boost', message.guild.premiumSubscriptionCount)
        .addField('Server advantage', message.guild.features.length == 0 ? 'None' : message.guild.features.map(f => features[f]).join(", "))
        .setImage(message.guild.bannerURL({ size: 2048, format: "png" }));
    message.channel.send(embed);

    }
    }