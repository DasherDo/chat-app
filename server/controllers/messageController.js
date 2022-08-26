const Message = require('../models/message');

module.exports.create_message = async (req, res, next) => {
	try {
		const { body, sender, recipient } = req.body;
		const data = await Message.create({
			body: body,
			sender: sender,
			recipient: recipient,
		});
		// If successful sends message data back to React with true status
		if (data) {
			return res.json({ msg: 'Message Sent', data, status: true });
		} else {
			return res.json({ msg: 'Failed to send' });
		}
	} catch (err) {
		next(err);
	}
};

module.exports.get_message = (req, res, next) => {
	try {
		const { sender, recipient } = req.body;
		const messages = Message.find({
			recipient: { $in: [sender, recipient] },
		})
			.select(['body', 'sender', 'recipient'])
			.exec((err, results) => {
				return res.json(results);
			});
	} catch (err) {
		next(err);
	}
};
