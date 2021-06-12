import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
// import { render } from 'react-dom';
// import Login from './Login';
// import io from 'socket.io-client';
import socketIOClient from "socket.io-client";
const ENDPOINT = ":3000";

function documento(props) {


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    let message = document.getElementById('message');
    
    socket.on('chat:message', function (data){
    
        output.innerHTML += `<p>
            <strong>${data.username}</strong>: ${data.message} 
         </p>`
     });
     
     socket.on('chat:typing', function (data) {
     
       console.log(data);
       
       message.value = "";
       message.value = data;
       
     });
    
     message.addEventListener('keypress', function () {
        socket.emit('chat:typing', message.value);
    })

  }, []);


  const [Cont, setCont] = useState("");
  const [Inv, setInv] = useState("");
  // console.log("prps de documento: ",props);
  const {register, formState: { errors }, handleSubmit} = useForm();
    // const element = <h1>Bienvenido</h1>;
    // let message = document.getElementById('message');

    const onSubmit = (data, e) => {
        // console.log(data.target.value);
        setCont(data.target.value);
        // console.log(Cont);
    }
    const onSubmit2 = (data, e) => {
      // console.log(data.target.value);
      setInv(data.target.value);
      // console.log(Cont);
  }

    const guardar = (data, e) => {

      fetch("/docs/guardar_doc", {
        method: "POST",
        body: JSON.stringify({
          _id: props.idDoc,
          content: Cont
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("se guardaron cambios");
        // if(data.code==200){
        //   render(<Principal/>, document.getElementById('Inicio'))
        // }else{
        //   render(element, document.getElementById('message_err'))
        // }
      });
    }

    const agregar = (data, e) => {
      

      fetch("/docs/agregar_inv", {
        method: "POST",
        body: JSON.stringify({
          _id: props.idDoc,
          invitado: Inv
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("se agrego el invitado");
        // if(data.code==200){
        //   render(<Principal/>, document.getElementById('Inicio'))
        // }else{
        //   render(element, document.getElementById('message_err'))
        // }
      });
    }

  return (
    <div>
    <div className="cabeza">
            <img className="logo" src={logo}/>
            
            <div className="nom_doc">
            <form onSubmit={handleSubmit(guardar)}>
                <div className="guardar_btn">
                <button>Guardar cambios</button>
                </div>
            </form>
            </div>
            
            
            <div className="agregar">
                    <input
                        type='text' 
                        placeholder='correo del invitado'
                        name="inv"
                        onChange={onSubmit2}
                    ></input>
                    <div className="agregar_btn">
                        <button onClick={agregar}>Agregar</button>
                    </div>
            </div>
    </div>
    <div className='container'>
    <div id="chat-container">
        <textarea id="message" name="texto" cols="81" value={props.content} rows="50" placeholder="Escribe aquí el texto.." onChange={onSubmit}  >
        </textarea>
    </div>
    </div>
    {/* <script src="/socket.io/socket.io.js"></script>
    <script src="https://cdn.socket.io/4.0.0/socket.io.min.js" integrity="sha384-DkkWv9oJFWLIydBXXjkBWnG1/fuVhw8YPBq37uvvD6WSYRFRqr21eY5Dg9ZhmWdy"></script>
    <script defer src="../../public/socket_conection.js"></script> */}
    </div>
  );
}

export default documento;