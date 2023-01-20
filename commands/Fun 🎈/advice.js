const { Random } = require('something-random-on-discord');
const random = new Random();

module.exports = {
    name: "advice",
    aliases: null,
    usage: null,
    description: "Something Random on Discord",
    timeout: 4000,

    run: async (client, message, args) => {
	try {
		const data = await random.getAdvice();
		message.channel.send(data);
	} catch (err) {
		if (bot.config.debug) bot.logger.error(`${err.message} - command: advice.`);
		message.error('ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
		if (message.deletable) message.delete();
	}
    }
}