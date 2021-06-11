const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocumentSchema = new Schema({
    email_dueño: {type: String, require: true},
    namedoc: {type: String},
    content: {type: String},
    inv1: {type: String},
    inv2: {type: String},
    inv3: {type: String},
})

module.exports = mongoose.model('document', DocumentSchema, 'document');