const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class InRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: "inrole",
			category: "info",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
		})
	}
	 run({ message, args}) {

var n = 0;

const role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()

if (!role) return message.channel.send('Role not found')

const members = role.members.cache.map(x => x.user.tag)
var pages = []

for (var i of members) {

var str = '';
var count = 0;

if (count > 10 || i == members[members.length]){

pages.push(str)

str = '';
count = 0;

} else {

str += ' '+i;
count++

}


parseInt(2)
}


var page = 0;

const embed = new MessageEmbed()
.setDescription(pages[page])
.setFooter(`Page ${page}/${pages.length}`)

message.channel.send(embed).then(async msg => {

const filter = (r) => ['emoji', 'emoji'].includes(r.emoji.name)

const colector = await msg.createReactionColector(filter)

colector.on('collect', s => {



})


})


    }

}