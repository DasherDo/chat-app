const Message = require('../models/message');

module.exports.create_message = async (req, res) => {
    const { subject, body, sender, recipient } = req.body;
	console.log(req.body)
    const message = await Message.create({
        subject, body, sender, recipient
    })
    return res.json({status: true, message})
}