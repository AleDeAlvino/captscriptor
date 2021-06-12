const socket = io()


//DOM elements
let message = document.getElementById('message');
// let username = document.getElementById('username');
// let btn = document.getElementById('send');
// let output = document.getElementById('output');
// let actions = document.getElementById('actions');
// var text="a";

// btn.addEventListener('click', function () {
//     socket.emit('chat:message', {
//         message: message.value,
//         username: username.value
//     });
// });

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', message.value);
})

socket.on('chat:message', function (data){
    
   output.innerHTML += `<p>
       <strong>${data.username}</strong>: ${data.message} 
    </p>`
});

socket.on('chat:typing', function (data) {
    // text = '';
    // text = data;
    // data='a'
    // for(var i=1; i==2; i++){
    console.log(data);
    // }
    // data = "";
    // message.value = text;
    // actions.innerHTML += `<p><em>${data} </em></p>`
    
    message.value = "";
    message.value = data;
    
});