let User = require('../models/user');

let async = require('async');

exports.user_list = (req, res) => {

    User.find()
        .sort([['name','ascending']])
        .exec((err, list_users) => {
            res.json({'list_users' : list_users})
        }) 
    }