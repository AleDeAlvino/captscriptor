const mongoose = require('mongoose'); //se manda llamar a mongoose
const { Schema } = mongoose; //Se llama la funcion Schema de mongoose

//Se crea el Schema
const UserSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}

})

//Se exporta el modelo (nombre de la coleccion a crear si no existe, nombre del Schema, nombre de la coleccion en la BD)
module.exports = mongoose.model('user', UserSchema, 'user');