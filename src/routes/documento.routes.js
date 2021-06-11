const express = require('express');
const router = express.Router();
// const User = require('../models/user_model');
// var bcrypt = require('bcrypt');
const controlador = require('./controladores/ctrl');
const Document = require('../models/document_model');

router.post('/Logout', controlador.postLogout);

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

router.post('/guardar_doc', async (req, res) => {
    const {_id, content} = req.body;
    const doc_old = await Document.findById(_id);
    console.log(doc_old);
    var email_dueño = doc_old.email_dueño;
    var namedoc = doc_old.namedoc;
    console.log("e: ", email_dueño, "  n: ", namedoc);
    var inv1 =" ";
    var inv2 =" ";
    var inv3 =" ";
    const doc_new = {email_dueño, namedoc, content, inv1, inv2, inv3};
    await Document.findByIdAndUpdate(_id, doc_new, {
        useFindAndModify: false
    }).then(function(){
        console.log("si jalo")
    }).catch(function(){
        console.log("No jalo")
    })
    res.json({messa: "oki"});
});

router.post('/agregar_inv', async (req, res) => {
    const {_id, invitado} = req.body;
    const doc_old = await Document.findById(_id);
    console.log(doc_old);
    var email_dueño = doc_old.email_dueño;
    var namedoc = doc_old.namedoc;
    var content = doc_old.content;
    var inv1= doc_old.inv1;
    var inv2= doc_old.inv2;
    var inv3= doc_old.inv3;
    console.log(inv1);
    // var inv1 = invitado;
    // var doc_new = {email_dueño, namedoc, content, inv1};
    if(inv1 = " "){
        inv1 = invitado;
        var doc_new = {email_dueño, namedoc, content, inv1};
    }
    else if (inv2 = " "){
        inv2 = invitado;
        var doc_new = {email_dueño, namedoc, content, inv1, inv2};
    }
    else if (inv3 = " "){
        inv3 = invitado;
        var doc_new = {email_dueño, namedoc, content, inv1, inv2, inv3};
    }
    await Document.findByIdAndUpdate(_id, doc_new, {
        useFindAndModify: false
    }).then(function(){
        console.log("si jalo")
    }).catch(function(){
        console.log("No jalo")
    })
    res.json({messa: "oki"});
});

router.get('/docs_user', async (req, res) => {
    var user = req.session.user;
    var email_dueño = user[0].email;
    const documentos = await Document.find({$or:[{email_dueño:email_dueño},{inv1:email_dueño}]});
        res.json(documentos);
});




module.exports = router;