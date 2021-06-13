const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
var bcrypt = require('bcrypt');

//Ruta para registrarse
router.post('/SignIn', async (req, res) => {
    const { name, email, password} = req.body; //Se recuperan las variables del body
    var BCRYPT_SALT_ROUNDS =12   //variable para indicar los saltos a bcrypt
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hashedPassword){
            var password = hashedPassword;
            const user = new User({ name, email, password}); //se crea nuevo usuario con su contraseña hasheada
            user.save(); //se guarda en la BD
            res.json({code: 200, message: 'Usuario guardado'});
        }).catch(function(error){
            console.log("Error saving user: ");
            console.log(error);
            res.json({code: 500, message:'Algo salio mal'});
        })
    
});

//Ruta para iniciar sesion
router.post('/Login', async (req, res) => {
    const { email, password} = req.body; //Se recuperan las variables del body
    var userobj='';
    await User.find({email:email}) //Se busca al usuario que desea iniciar sesion en la bd
    .then(function(user){
        userobj=user;
        var password2 = user[0].password;
        return bcrypt.compare(password, password2); //Si lo encuentra compara la contrseña ingresada y la guardad en la BD
    })
    .then(function(samePassword){
        if(!samePassword){
            res.json({code: 500, message: 'Contraseña incorrecta'}); //Si las contraseñas no coinciden manda un mensaje de error
        }
        req.session.isLoggedIn = true;
        req.session.user = userobj;
        res.json({code: 200, message: 'Usuario autenticado'}); //Si las contraseñas coinciden manda un mensaje de confirmacion
    })
    .catch(function(error){
        console.log("Error de autenticacion");
        res.json({code: 500, message: 'Usuario no autenticado'});
    });
});


module.exports = router;