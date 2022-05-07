function formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2
		});
	}

  async function fetchStats(country) {
		const { body } = await request
			.get(`https://disease.sh/v3/covid-19/${country === 'all' ? 'all' : `countries/${country}`}`);
		return body;
	}

  const request = require('node-superfetch');
const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class CovidCommand extends Command {
	constructor(client) {
		super(client, {
			name: "covid",
			category: "info",
			aliases: [],
			UserPermission: null,
			clientPermission: null,
			disabled: false
		})
	}
	async run({ message, args }) {

const country = args.join(" ") || 'all'

try {
			const data = await fetchStats(country);
			const embed = new MessageEmbed()
				.setColor(0xA2D84E)
				.setAuthor('Worldometers', 'https://i.imgur.com/IoaBMuK.jpg', 'https://www.worldometers.info/coronavirus/')
				.setTitle(`Stats for ${country === 'all' ? 'The World' : data.country}`)
				.setURL(country === 'all'
					? 'https://www.worldometers.info/coronavirus/'
					: `https://www.worldometers.info/coronavirus/country/${data.countryInfo.iso2}/`)
				.setThumbnail(country === 'all' ? null : data.countryInfo.flag || null)
				.setFooter('Last Updated')
				.setTimestamp(data.updated)
				.addField('❯ Total Cases', `${formatNumber(data.cases)} (${formatNumber(data.todayCases)} Today)`, true)
				.addField('❯ Total Deaths', `${formatNumber(data.deaths)} (${formatNumber(data.todayDeaths)} Today)`, true)
				.addField('❯ Total Recoveries',
					`${formatNumber(data.recovered)} (${formatNumber(data.todayRecovered)} Today)`, true)
				.addField('❯ Active Cases', formatNumber(data.active), true)
				.addField('❯ Active Critical Cases', formatNumber(data.critical), true)
				.addField('❯ Tests', formatNumber(data.tests), true);
			return message.channel.send(embed);
		} catch (err) {
			if (err.status === 404) return msg.say('Country not found or doesn\'t have any cases.');
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}

    }
  }