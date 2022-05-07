require('express')().get('/',(req,res)=>res.send('Hola')).listen(process.env.PORT||3000)
const { Intents } = require("discord.js");const a = new Intents(32767);
const Client = require('./LacrymasisClient')
const client = new Client({
	disableMentions: "everyone",
	ws: {
		intents: a
	},
  partials: ['MESSAGE', 'REACTION']
})
const fs = require("fs")
const logs = require('discord-logs');
logs(client);

client.loadCommands('./commands')
client.loadEvents('./events')
client.login(process.env.token)
	.then(() => console.log(`Bot is online.`))
	.catch((e) => console.log(`Failure connecting to Discord! ${e.message}!`))

