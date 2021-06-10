const express = require('express');
const morgan = require('morgan');
const path = require('path');
const isAuth = require('./is_auth');
// var router = express.Router();
const docs = require('./routes/user.routes.js');
var session = require('express-session');

const { mongoose } = require('./database');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use(session({
    secret: 'my  ',
    resave: false,
    saveUninitialized: false,
}));

//routes
app.use('/user', require('./routes/user.routes.js'));
app.use('/docs', require('./routes/documento.routes.js'));

//static files
app.use(express.static(path.join(__dirname, 'public')));


//starting the server

app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
});