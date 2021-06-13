const mongoose = require('mongoose'); //se manda llamar mongoose
//Se guarda en una variable la liga que nos proporciona MongoDB Atlas para conectarnos al clouster donde se almacena nuestra BD
const URI = "mongodb+srv://AleDeAlvino:SHEISTHEONE2@cluster0.r1ng5.mongodb.net/Captscriptor?retryWrites=true&w=majority";

//Se conecta mongo con la url de antes y se le agregan ciertas caracteristicas al momento de usar los modelos
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => {
        console.log('DB is connected');
    })
    .catch(err => console.error(err));

module.exports = mongoose;