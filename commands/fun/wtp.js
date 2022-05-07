const { MessageEmbed } = require("discord.js")
const Command = require("../../structures/command")
const over = require('poke-over') 

module.exports = class WhoThatPokemonCommand extends Command {
	constructor(client) {
		super(client, {
			name: "wtp",
			category: "fun",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			disabled: false
		})
	}
  async run({ message, args}) {

 over.randomPokemon().then(pokemon => { 
const embed = new MessageEmbed() 
.setColor("RANDOM")
.setTitle("Who's that Pokemon?")
.setDescription("You have 15 segs")
.setImage(pokemon.imageURL)
message.channel.send(embed).then(msj => { 
message.channel.awaitMessages(x => x.content.toLowerCase() === pokemon.name.toLowerCase() && x.author.id === message.author.id, { max: 1, time: 15000, errors: ['time'] }).then(col => { 
const embed2 = new MessageEmbed() 
.setColor("GREEN")
.setTitle("Correct!")
.setDescription("The pokemon is "+pokemon.name)
.setImage(pokemon.imageURL)
msj.edit(embed2) 
       }).catch(col => { 
const embed3 = new MessageEmbed() 
.setColor("RED")
.setTitle("You loose!")
.setDescription("The pokemon is "+pokemon.name)
.setImage(pokemon.imageURL)
msj.edit(embed3) 
       })
     })
   })

    }
    }