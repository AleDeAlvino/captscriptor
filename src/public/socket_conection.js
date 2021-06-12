// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3000";
// const socket = socketIOClient(ENDPOINT);
const socket = io()

//DOM elements
let message = document.getElementById('message');
// let username = document.getElementById('username');
// let btn = document.getElementById('send');
// let output = document.getElementById('output');
// let actions = document.getElementById('actions');
// var text="a";


message.addEventListener('keypress', function () {
    socket.emit('chat:typing', message.value);
})

// socket.on('chat:message', function (data){
    
//    output.innerHTML += `<p>
//        <strong>${data.username}</strong>: ${data.message} 
//     </p>`
// });

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

// export default function ClientComponent() {
//   const [response, setResponse] = useState("");

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);

//     let message = document.getElementById('message');
    
//     socket.on('chat:message', function (data){
    
//         output.innerHTML += `<p>
//             <strong>${data.username}</strong>: ${data.message} 
//          </p>`
//      });
     
//      socket.on('chat:typing', function (data) {
     
//        console.log(data);
       
//        message.value = "";
//        message.value = data;
       
//      });
    
//      message.addEventListener('keypress', function () {
//         socket.emit('chat:typing', message.value);
//     })

//   }, []);

//   return (
//     <p>
//       It's <time dateTime={response}>{response}</time>
//     </p>
//   );
// }