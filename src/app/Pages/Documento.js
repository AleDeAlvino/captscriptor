import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
// import { render } from 'react-dom';
// import Login from './Login';



function documento(props) {

  const [Cont, setCont] = useState("");
  // console.log("prps de documento: ",props);
  const {register, formState: { errors }, handleSubmit} = useForm();
    // const element = <h1>Bienvenido</h1>;
    // let message = document.getElementById('message');

    const onSubmit = (data, e) => {
        // console.log(data.target.value);
        setCont(data.target.value);
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
          invitado: data.inv
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
                <form onSubmit={handleSubmit(agregar)}> 
                    <input
                        type='text' 
                        placeholder='correo del invitado'
                        name="inv"
                        {...register('inv',{
                          required: true,
                          type: 'email'
                      })}
                    ></input>
                    {errors.corr && <span>Ingrese un correo valido</span>}
                    <div className="agregar_btn">
                        <button>Agregar</button>
                    </div>
                </form>
            </div>
    </div>
    <div className='container'>
    <div id="chat-container">
        <textarea id="message" name="texto" cols="81" rows="50" placeholder="Escribe aquí el texto.." onChange={onSubmit}  >
        </textarea>
    </div>
    </div>
    </div>
  );
}

export default documento;