const Levels = require("discord-xp");
const { MessageEmbed} = require('discord.js')
module.exports = class MessageReceive {
	constructor(client) {
		this.client = client
	}
  async run(message) {

const prefix = '?';
if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;
if (message.guild){
 const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; 
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
 if(hasLeveledUp) {
		
		const user = await Levels.fetch(message.author.id, message.guild.id);
		
		const levelEmbed = new MessageEmbed()
		.setTitle('New Level!')
		.setDescription(`${message.author}, you just leveled up to level **${user.level + 1}**!\n🥳`)

		const sendEmbed = await message.channel.send(levelEmbed)
		sendEmbed.react('🥳')
	}
  }

		const args = message.content.slice(prefix.length).trim().split(/ +/g)
		const command = args.shift().toLowerCase()
		const comando = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
		let owner = await this.client.users.fetch("641253047309303818")
		if (!comando) return;
	/*	if (user.blacklist) {
			let avatar = message.author.displayAvatarURL({ format: "png", dynamic: true })

			const embed = new MessageEmbed()
	
			message.channel.send(embed)
			return
		}
    */

		if (comando.config.disabled) {
	if (message.author.id !== '641253047309303818') return message.channel.send('Command disabled')
		}
/*
		if (cooldown.has(message.author.id)) {
	

		}
		cooldown.set(message.author.id, Date.now() + 5000)

		setTimeout(() => {
			cooldown.delete(message.author.id)
		}, 5000)
*/
/*
		let userPermission = comando.config.UserPermission
		let clientPermission = comando.config.ClientPermission
		if (userPermission !== null) {
			if (!message.member.permissions.has(userPermission)) {
				let perm = userPermission.map(value => t(`permissions:${value}`)).join(", ")
				return message.channel.send('Permission failed')
			}
		}
		if (clientPermission !== null) {
			if (!message.guild.me.hasPermission(clientPermission) || !message.channel.permissionsFor(this.client.user.id).has(clientPermission)) {
				let perm = clientPermission.map(value => t(`permissions:${value}`)).join(", ")
				return message.chinoReply("error", `${t("permissions:CLIENT_MISSING_PERMISSION", { perm: perm })}`)
			}
		}
	*/

		
			comando.run({ message, args})

  }
  }