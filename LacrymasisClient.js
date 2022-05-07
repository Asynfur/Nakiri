const { Client, Collection } = require("discord.js")
const { readdir } = require("fs")
const EventManager = require("./structures/EventManager")
const mongoose = require('mongoose');
const log = require('colorlogsplus').Logger;
const canvacord = require('canvacord')

module.exports = class LacrymasisClient extends Client {
	constructor(options = {}) {
		super(options)

		this.commands = new Collection()
		this.aliases = new Collection()
    this.games = new Collection()
		this.events = new EventManager(this)
		this.colors = require("./structures/colors")
		this.emotes = require("./structures/emotes")
    this.levels = require('./manager/level')
    this.img = canvacord;
    this.utils = require('./utils/Util')

	
mongoose.connect(process.env.url, { useNewUrlParser: true, useUnifiedTopology: true}).then(x => {

this.db = mongoose.connection;
console.log('Base de datos conectada.')

}).catch(e => console.error(e))

	}

  login(token) {
		return super.login(token)
	}

  	loadCommands(path) {
		readdir(`${__dirname}/commands/`, (err, files) => {
			if (err) console.error(err)
			files.forEach(category => {
				readdir(`${__dirname}/commands/${category}`, (err, cmd) => {
					cmd.forEach(async cmd => {
						const command = new (require(`${__dirname}/commands/${category}/${cmd}`))(this)
						command.dir = `${__dirname}/commands/${category}/${cmd}`
						this.commands.set(command.config.name, command)
						command.config.aliases.forEach(a => this.aliases.set(a, command.config.name))
			log.command(`$bl/Command loaded ${command.config.name}`)
					})
				})
			})
		})

		return this;
	}
	loadEvents(path) {
		readdir(path, (err, files) => {
			if (err) console.error(err)

			files.forEach(em => {
				const event = new (require(`${path}/${em}`))(this)
				this.events.add(em.split(".")[0], event)
        log.event(`$bl/Event loaded ${em.split('.')[0]}`)
			})
		})

		return this;
	}
}