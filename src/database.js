const mongoose = require('mongoose');
const URI = "mongodb+srv://AleDeAlvino:SHEISTHEONE2@cluster0.r1ng5.mongodb.net/captscriptor?retryWrites=true&w=majority";

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => {
        console.log('DB is connected');
    })
    .catch(err => console.error(err));

module.exports = mongoose;