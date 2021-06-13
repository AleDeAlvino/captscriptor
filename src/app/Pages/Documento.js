import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import logo from '../../public/logo.jpg';
import { render } from 'react-dom';
import Principal from './Principal';
import { jsPDF } from "jspdf";
import socketIOClient from "socket.io-client";
const ENDPOINT = ":3000";

function documento(props) {

  //Funcion encargada de cargar el socket al momento de cargar la pagina
  useEffect(() => {

    //Se crea el socket por parte del cliente
    const socket = socketIOClient(ENDPOINT);

    //Se trae el componente con Id "message"
    let message = document.getElementById('message');
    
    //Envia el nombre con el que desea que se cree el room al que va a pertenecer
    socket.emit('name_room', props.idDoc);

    //Al moemnto de que alguno de los usuarios en el room escriba se reflejara en mi componente "message"
     socket.on('chat:typing', function (data) {
     
       console.log(data);
       
       message.value = "";
       message.value = data;
       
     });
    
     //Al moemnto de que YO escriba en el componente "message" se estara mandando a los usuarios del room
     message.addEventListener('keypress', function () {
        socket.emit('chat:typing', message.value);
    })

  }, []);

//Constante para crear un pdf llamando a la libreria jsPDF
  const doc = new jsPDF();

  //Variables globales
  const [Cont, setCont] = useState(props.content);
  const [Inv, setInv] = useState("");

  //constantes que necesita el useform para validar
  const {register, formState: { errors }, handleSubmit} = useForm();

  //Funcion que escucha al componente texarea cada que escribe y lo guarda en la variable Cont, que será el contenido de nuestro documento
    const onSubmit = (data, e) => {
        setCont(data.target.value);
    }
    //Funcion que escucha al componente input cada que escribe y lo guarda en la variable Inv, que sera el que enviaremos para agregar como invitado
    const onSubmit2 = (data, e) => {
      setInv(data.target.value);
  }

    //funcion encargada de guardar los cambios hechos en el documento a traves de la ruta guardar_doc
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
      });
    }


    //funcion encargada de agregar a los usuarios invitados al documento a traves de la ruta agregar_inv
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
      });
    }

    //funcion encargada de descargar el documento a traves de la libreria jsPDF
    const descargar_doc = (data, e) => {
      doc.text(Cont, 10, 10);
      doc.save(props.namedoc +".pdf");
    }

    //funcion encargada de eliminar el documento a traves de la ruta delete_doc
    const eliminar_doc = (data, e) => {
      fetch(`/docs/delete_doc/${props.idDoc}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log("Dato eliminado");
          render(<Principal/>, document.getElementById('Inicio'))
        });
    }

    //Funcion para regresar a la pantalla principal
    const regresar = (data, e) => {
      render(<Principal/>, document.getElementById('Inicio'))
    }

  return (
    <div>
    <div className="cabeza">
            <img className="logo" src={logo}/>
            
            <div className="nom_doc">
            <form onSubmit={handleSubmit(guardar)}>
                <div>
                <button className="guardar_btn">Guardar cambios</button>
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
                    <div>
                        <button className="agregar_btn" onClick={agregar}>Agregar invitado</button>
                    </div>
            </div>

            <div className="descargar">
            
                <div >
                <button className="descargar_btn" onClick={descargar_doc}>Descargar documento</button>
                </div>
            
            </div>

            <div className="eliminar">
            
                <div >
                <button className="eliminar_btn" onClick={eliminar_doc}> Eliminar documento</button>
                </div>
            
            </div>

            <div className="regresar">
            
              <div >
                <button className="regresar_btn" onClick={regresar}> Regresar</button>
              </div>
        
            </div>

    </div>
    <div className='container'>
    <div id="chat-container">
        <textarea id="message" name="texto" cols="81" value={Cont} rows="50" placeholder="Escribe aquí el texto.." onChange={onSubmit}  >
        </textarea>
    </div>
    </div>
    </div>
  );
}

export default documento;