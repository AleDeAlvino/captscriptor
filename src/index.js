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

const server = app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
});


//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    });

    socket.on('chat:typing', (data) => {
        // if(data!=""){
            console.log(data);
            // io.emit('chat:typing', data);
            socket.broadcast.emit('chat:typing', data);
        // }
        // io.emit('chat:typing', data);
    });


});