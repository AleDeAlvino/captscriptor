const mongoose = require('mongoose'); //se manda llamar a mongoose
const { Schema } = mongoose;  //Se llama la funcion Schema de mongoose

//Se crea el Schema
const DocumentSchema = new Schema({
    email_dueño: {type: String, require: true},
    namedoc: {type: String},
    content: {type: String},
    inv1: {type: String},
    inv2: {type: String},
    inv3: {type: String},
})

//Se exporta el modelo (nombre de la coleccion a crear si no existe, nombre del Schema, nombre de la coleccion en la BD)
module.exports = mongoose.model('document', DocumentSchema, 'document');