const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
var bcrypt = require('bcrypt');
// var session = require('express-session');

router.post('/SignIn', async (req, res) => {
    const { name, email, password} = req.body;
    var BCRYPT_SALT_ROUNDS =12
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hashedPassword){
            console.log(hashedPassword);
            var password = hashedPassword;
            const user = new User({ name, email, password});
            user.save();
            res.json({code: 200, message: 'Usuario guardado'});
        }).catch(function(error){
            console.log("Error saving user: ");
            console.log(error);
            res.json({code: 500, message:'Algo salio mal'});
        })
    
});

router.post('/Login', async (req, res) => {
    const { email, password} = req.body;
    console.log("Entro a la funcion");
    var userobj='';
    await User.find({email:email})
    .then(function(user){
        console.log("llego aqui");
        console.log(user);
        userobj=user;
        var password2 = user[0].password;
        console.log(password2);
        return bcrypt.compare(password, password2);
    })
    .then(function(samePassword){
        if(!samePassword){
            res.json({code: 500, message: 'Contraseña incorrecta'});
        }
        console.log("usuario autenticado");
        console.log(userobj);
        req.session.isLoggedIn = true;
        req.session.user = userobj;
        res.json({code: 200, message: 'Usuario autenticado'});
    })
    .catch(function(error){
        console.log("Error de autenticacion");
        res.json({code: 500, message: 'Usuario no autenticado'});
    });
});


module.exports = router;