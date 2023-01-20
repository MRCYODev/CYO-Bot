module.exports = {
	name: 'unpin',
	aliases: null,
	description: 'Unpin a specific messaged to the channel.',
	usage: '(Message_ID)',
    timeout: 10000,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send({embed: {
                    color: 10038562,
                    description: `You don't have **MANAGE_MESSAGES** permissions <a:x_:789158785540948008>`
                }});
		}

		if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send({embed: {
                    color: 10038562,
                    description: `You don't have **MANAGE_MESSAGES** permissions <a:x_:789158785540948008>`
                }});
		}

		const msg = args[0];
		if(!msg || isNaN(msg)) {
			return message.channel.send({embed: {
                    color: 10038562,
                    description: `Please provide a valid message. <a:x_:789158785540948008>`
                }});
		}
		try {
			message.channel.messages.fetch(msg)
				.then(pinned => {
					if(pinned.pinned) {
						pinned.unpin(msg);
						message.channel.send({embed: {
                            color: '#62ec2a',
                            description: `Successfully Unpinned ${msg} <a:wel:789157351290699826>`
                        }}).then(message.delete());
					}
					else {
						return message.channel.send(
                            {embed: {
                                color: 10038562,
                                description: `That message is not pinned. <a:x_:789158785540948008>`
                            }});
					}
				});
		}
		catch (e) {
			return message.channel.send(
				{embed: {
                    color: 10038562,
                    description: `An error occured, please try again <a:x_:789158785540948008>`
                }});
		}
	},
};