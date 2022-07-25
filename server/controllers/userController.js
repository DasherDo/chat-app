const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');

exports.user_list = (req, res) => {

    User.find()
        .sort([['name','ascending']])
        .exec((err, list_users) => {
            res.json({'list_users' : list_users})
        }) 
    }

module.exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    const usernameCheck = await User.findOne({username});
    if (usernameCheck) {
        return res.json({msg: 'Username Taken', status : false})
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
        username, password : hashedPassword
    })
    delete user.password
    return res.json({status : true, user})
};