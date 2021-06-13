const express = require('express');
const morgan = require('morgan');
const path = require('path');
const isAuth = require('./is_auth');
const docs = require('./routes/user.routes.js');
var session = require('express-session');

const { mongoose } = require('./database');

//Se inicia nuestro entorno en express
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Key para la session
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

//se crea un nuevo socket
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    var namer;

    //Se le asigna un room al usuario
    socket.on('name_room', (data) => {
        console.log(data);
        namer = data;
        socket.join(data);
    });

    //Se emite al usuario conectado lo que escribe el resto de los usuarios del room
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    });

    //Se manda al resto de los usuarios del room lo que escribe el usuario conectado
    socket.on('chat:typing', (data) => {
            console.log(data);
            console.log("enviando a: ", namer);
            socket.to(namer).emit('chat:typing', data);
    });


});