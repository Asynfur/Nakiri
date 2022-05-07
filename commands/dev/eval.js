     const util = require('util')
const { MessageEmbed } = require("discord.js")
const Command = require("../../structures/command")
const getTypeOf = obj => Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];

module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: "eval",
			category: "dev",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			disabled: true
		})
	}
 async run({ message, args}) {
 
  try {
    const returned = eval(args.join(" ")) 
    let str = await util.inspect(returned, {
      depth: 1
    })
    if (str.length > 1900) {
      str = str.slice(0, 1897)
      str = str + '...'
    }
    str = str.replace(new RegExp(process.env.token, 'gi'), '( ͡° ͜ʖ ͡°)')
    message.channel.send(getTypeOf(returned)+'\n\n```js\n' + str + '\n```').then((ms) => {
      if (returned !== undefined && returned !== null && typeof returned.then === 'function') {
        returned.then(() => {
          let str = util.inspect(returned, {
            depth: 1
          })
          if (str.length > 1900) {
            str = str.slice(0, 1897)
            str = str + '...'
          }
          ms.edit(getTypeOf(returned)+'\n\n```js\n' + str + '\n```')
        }, (e) => {
          let str = util.inspect(e, {
            depth: 1
          })
          if (str.length > 1900) {
            str = str.slice(0, 1897)
            str = str + '...'
          }
          ms.edit(getTypeOf(returned)+'\n\n```js\n' + str + '\n```')
        })
      }
    })
  } catch (e) {
    message.channel.send('```js\n' + e + '\n```')
  }
  }
}