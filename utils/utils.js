const { MessageEmbed } = require("discord.js")
const humanize = require("humanize-duration")

module.exports = {
	maxElements(array, maxLen = 10) {
		if (array.length > maxLen) {
			const len = array.length - maxLen;
			array = array.slice(0, maxLen);
			array.push(`${len} more...`);
		}
		return array;
  },
  	randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	duration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
		return `${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
	},
  shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.slice(0, maxLen - 3)}...` : text;
	},
  delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},
ago(time){

return humanize(time - Date.now(), { round: true});

}
}