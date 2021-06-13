const express = require('express');
const router = express.Router();
const controlador = require('./controladores/ctrl');
const Document = require('../models/document_model');

//Funcion para cerrar sesion
router.post('/Logout', controlador.postLogout);

//Funcion para crear nuevo documento
router.post('/new_doc', async (req, res) => {
    const {name_doc} = req.body; //Se recuperan las variables del body
    var user = req.session.user; //Se recupera el nombre del usuario que lo desea crear
    var email_dueño = user[0].email; //Se recupera el correo del usuario que lo desea crear
    var namedoc = name_doc; //Se guarda el nombre del documento
    var inv1 =" "; //Se inicializa al invitado 1
    var inv2 =" "; //Se inicializa al invitado 2
    var inv3 =" "; //Se inicializa al invitado 3
    const doc = new Document({email_dueño, namedoc, inv1, inv2, inv3}); //Se crea el nuevo documento
    doc.save(); //Se guarda el nuevo documento
    res.json({doc});
});

//Funcion para guardar los cambios en el documento
router.post('/guardar_doc', async (req, res) => {
    const {_id, content} = req.body; //Se recuperan las variables del body
    const doc_old = await Document.findById(_id); //Se busca el documento que se esta editando
    var email_dueño = doc_old.email_dueño; //Se guarda en una variable el correo del usuario
    var namedoc = doc_old.namedoc; //Se guarda en una variable el nombre del documento
    var inv1 =doc_old.inv1; //Se guarda en variable al invitado 1
    var inv2 =doc_old.inv2; //Se guarda en variable al invitado 2
    var inv3 =doc_old.inv3; //Se guarda en variable al invitado 3
    const doc_new = {email_dueño, namedoc, content, inv1, inv2, inv3}; //Se crea el documento actualizado
    await Document.findByIdAndUpdate(_id, doc_new, { //Se actualiza
        useFindAndModify: false
    }).then(function(){
        console.log("Actualizacion exitosa")
    }).catch(function(){
        console.log("Actualizacion fallida")
    })
    res.json({messa: "oki"});
});

//Funcion para agregar colaboradores al documento
router.post('/agregar_inv', async (req, res) => {
    const {_id, invitado} = req.body; //Se recuperan las variables del body
    const doc_old = await Document.findById(_id);  //Se busca el documento que se esta editando
    var email_dueño = doc_old.email_dueño;
    var namedoc = doc_old.namedoc;
    var content = doc_old.content;
    var inv1= doc_old.inv1;
    var inv2= doc_old.inv2;
    var inv3= doc_old.inv3;
    if(inv1 === " "){ //Si el invitado 1 esta vacio se agrega a este campo
        inv1 = invitado;
        inv2 = " ";
        inv3 = " ";
        var doc_new = {email_dueño, namedoc, content, inv1, inv2, inv3};
    }
    else if (inv2 === " "){ //Si el invitado 2 esta vacio se agrega a este campo
        inv2 = invitado;
        inv3 = " ";
        var doc_new = {email_dueño, namedoc, content, inv1, inv2, inv3};
    }
    else if (inv3 === " "){ //Si el invitado 3 esta vacio se agrega a este campo
        inv3 = invitado;
        var doc_new = {email_dueño, namedoc, content, inv1, inv2, inv3};
    }
    await Document.findByIdAndUpdate(_id, doc_new, { //Se actualiza el documento actual
        useFindAndModify: false
    }).then(function(){
        console.log("Se agrego al invitado exitosamente")
    }).catch(function(){
        console.log("No se agrego al invitado exitosamente")
    })
    res.json({messa: "oki"});
});

//Funcion que regresa todos los documentos del usuario conectado, ya sea dueño o colaborador de ellos
router.get('/docs_user', async (req, res) => {
    var user = req.session.user;
    var email_dueño = user[0].email;
    const documentos = await Document.find({$or:[{email_dueño:email_dueño},{inv1:email_dueño}]});
        res.json(documentos);
});

//Funcion para eliminar documentos
router.delete('/delete_doc/:id', async(req, res) => {

    await Document.findByIdAndRemove(req.params.id);
    res.json({status: 'Documento Eliminado'});
});


module.exports = router;