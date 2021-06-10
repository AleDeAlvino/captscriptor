const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
var bcrypt = require('bcrypt');

router.post('/SignIn', async (req, res) => {
    const { name, email, password} = req.body;
    var BCRYPT_SALT_ROUNDS =12
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hashedPassword){
            console.log(hashedPassword);
            var password = hashedPassword;
            const user = new User({ name, email, password});
            user.save();
            res.json({status: 'Usuario guardado'});
        }).catch(function(error){
            console.log("Error saving user: ");
            console.log(error);
            res.json({status: 'Algo salio mal'});
        })
    
});

router.post('/Login', async (req, res) => {
    const { email, password} = req.body;
    const user = await User.find({$and:[{email : email}, {password: password}]});
    console.log(user);
    res.json({status: 'Usuario guardado'});
});

module.exports = router;