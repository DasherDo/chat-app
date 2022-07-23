const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name : {type: String, required: true, maxlength: 100},

    }
)

User.virtual('url').get(() => {
    return '/user/' + this._id
})

module.exports = mongoose.model('User', UserSchema)
