const log = require('colorlogsplus').Logger;

module.exports = class {
	constructor(client) {
		this.client = client
	}

	async run(error) {


  log.error(`$r/${error}`)
    }
}