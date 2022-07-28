const Message = require('../models/message');

module.exports.create_message = async (req, res, next) => {
    try {

		const { body, sender , recipient } = req.body;
		const { data } = await Message.create({
			body : body,
			sender : sender,
			recipient : recipient
		});
		if (data) {
			return res.json({msg: "Message Sent", data});
		}
		else {
			return res.json({msg: "Failed to send"});
		}	
	} catch (err) {
		next(err);
	};
}