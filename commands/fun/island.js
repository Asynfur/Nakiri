const { delay, awaitPlayers, reactIfAble } = require('../../utils/Util');
const { stripIndents } = require('common-tags');
const { Collection } = require("discord.js");

const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class IslandCommand extends Command {
	constructor(client) {
		super(client, {
			name: "island",
			category: "fun",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	async run({ message, args }) {
const playersCount = args[0]

    const current = this.client.games.get(message.channel.id);
		if (current) return message.channel.sendr(`Please wait until the current game of \`${current.name}\` is finished.`);
		this.client.games.set(message.channel.id, { name: this.name });
		try {
			const awaitedPlayers = await awaitPlayers(message, playersCount, 3);
			if (!awaitedPlayers) {
				this.client.games.delete(message.channel.id);
				return message.channel.send('Game could not be started...');
			}
			let turn = 0;
			const players = new Collection();
			for (const player of awaitedPlayers) {
				players.set(player, {
					id: player,
					user: await client.users.fetch(player)
				});
			}
			let lastTurnTimeout = false;
			const playersLeft = new Set(players.map(p => p.id));
			while (playersLeft.size > 2) {
				++turn;
				await message.channel.send(stripIndents`
					**Day ${turn}.** Who should be kicked off the island?
					You have **2 minutes** to make a decision before voting starts.
				`);
				await delay(120000);
				const choices = players.filter(player => playersLeft.has(player.id));
				const ids = choices.map(player => player.id);
				let i = 0;
				const display = choices.map(player => {
					const res = `**${i + 1}.** ${player.user.tag}`;
					i++;
					return res;
				});
				await message.channel.send(stripIndents`
					Alright, who do you want to kick off the island? You have 1 minute to vote.
					_Type the number of the player you want to kick._
					${display.join('\n')}
				`);
				const votes = new Collection();
				const voteFilter = res => {
					if (!playersLeft.has(res.author.id)) return false;
					const int = Number.parseInt(res.content, 10);
					if (int >= 1 && int <= playersLeft.size) {
						const currentVotes = votes.get(choices[int - 1]);
						votes.set(ids[int - 1], {
							votes: currentVotes ? currentVotes + 1 : 1,
							id: ids[int - 1]
						});
						reactIfAble(res, res.author, '✅');
						return true;
					}
					return false;
				};
				const vote = await message.channel.awaitMessages(voteFilter, {
					max: playersLeft.size,
					time: 60000
				});
				if (!vote.size) {
					if (lastTurnTimeout) {
						await message.channel.send('Game ended due to inactivity.');
						break;
					} else {
						await message.channel.send('Come on guys, get in the game!');
						lastTurnTimeout = true;
						continue;
					}
				}
				const kicked = players.get(votes.sort((a, b) => b.votes - a.votes).first().id);
				playersLeft.delete(kicked.id);
				await message.channel.send(stripIndents`
					**${kicked.user.tag}** will be kicked off the island.
					${playersLeft.size > 2 ? '_Next round starts in 30 seconds.' : ''}
				`);
				if (playersLeft.size > 2) await delay(30000);
				else break;
			}
			this.client.games.delete(message.channel.id);
			const winners = players.filter(player => playersLeft.has(player.id));
			return message.channel.send(`Congrats, ${winners.map(player => player.user.tag).join(' and ')}!`);
		} catch (err) {
			this.client.games.delete(message.channel.id);
			throw err;
		}
	}
  }
