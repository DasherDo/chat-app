import bcrypt from 'bcrypt';

let User = require('../models/user');

let async = require('async');

exports.user_list = (req, res) => {

    User.find()
        .sort([['name','ascending']])
        .exec((err, list_users) => {
            res.json({'list_users' : list_users})
        }) 
    }

module.exports.register = (req, res, next) => {

    const { username, password } = req.body;
    const usernameCheck = await User.findOne({username});
    if (usernameCheck) {
        return res.json({msg: 'Username Taken', status : false})
    }
};