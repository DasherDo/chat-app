const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');

module.exports.user_list = (req, res) => {

    try{
        User.find({id : {$ne : req.params.id}})
            .select(["username", "id"])
            .exec((err, results) => {
                return res.json(results)
            })
        
    }
    catch (err) {
        next(err)
    }
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

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if (!user) {
        return res.json({msg: "Incorrect username or password", status : false})
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        return res.json({msg: 'Incorrect username or password', status : false})
    };
    user.password = undefined;
    console.log('Login successful')
    return res.json({msg: 'Login successful', status : true, user})
}