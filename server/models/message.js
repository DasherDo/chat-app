const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        subject: {type: String, optional: true, maxlength:100},
        body: {type: String, required: true, minlength: 1},
        sender: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        recipient: {type: Schema.Types.ObjectId, ref: 'User', required: true}
    }
)

module.exports = mongoose.model('Message', MessageSchema)

