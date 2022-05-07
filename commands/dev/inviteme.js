const Command = require("../../structures/command")
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class InviteMeCommand extends Command {
  constructor(client) {
    super(client, {
 			name: "inviteme",
			category: "dev",
			aliases: ['invite', 'invme', 'im'],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
    });
  }
  run({message, args}) {
    const embed = new MessageEmbed()
      .setTitle('Invite me')
      .setThumbnail(this.client.user.displayAvatarURL())
      .setDescription(oneLine`
        Click [here](https://discordapp.com/oauth2/authorize?client_id=418803220157169664&scope=bot&permissions=403008599)
        to invite me to your server!
      `)
      .addField('Other links', 
        '**Support Server: Coming soon | ' +
        'Repository: Coming soon**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};