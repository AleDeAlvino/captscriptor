const express = require('express');
const router = express.Router();
// const User = require('../models/user_model');
// var bcrypt = require('bcrypt');
const controlador = require('./controladores/ctrl');
const Document = require('../models/document_model');


router.post('/new_doc', async (req, res) => {
    const {name_doc} = req.body;
    var user = req.session.user;
    var email_dueño = user[0].email;
    console.log("el user es: ", user);
    var namedoc = name_doc;
    const doc = new Document({email_dueño, namedoc});
    doc.save();
    console.log("si se pudo");
    console.log(doc);
    res.json({doc});
});

router.post('/Logout', controlador.postLogout);

module.exports = router;