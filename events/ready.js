const { red, green} = require("chalk")
const ora = require("ora")

module.exports = class Ready {
	constructor(client) {
		this.client = client
	}

	async run() {

const spinner = ora(`Cargando ping..`).start();

setTimeout(() => {

spinner.color = 'yellow',
spinner.text = `Encendido con un ping de (${red(this.client.ws.ping)})`

}, 1000)

this.client.user.setActivity(this.client.commands.size+" commands loaded", { type: 'WATCHING'})


  }
  }