const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocumentSchema = new Schema({
    email: {type: String, require: true},
    content: {type: String}
})

module.exports = mongoose.model('document', DocumentSchema, 'document');