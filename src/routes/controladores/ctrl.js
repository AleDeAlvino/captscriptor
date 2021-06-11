const express = require('express');
const router = express.Router();
// const User = require('../models/user_model');
// var bcrypt = require('bcrypt');
// const isAuth = require('../is_auth');

// const auth = function (req,res,next){
//     if (req.session.id && req.cookies.user_sid) {
//         res.send('No puedes acceder a esa pagina sin logearte')
//     } else {
//         next();
//     } 
// }


exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
    
};