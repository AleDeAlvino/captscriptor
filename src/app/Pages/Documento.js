import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
// import { render } from 'react-dom';
// import Login from './Login';



function documento() {

  const {register, formState: { errors }, handleSubmit} = useForm();
    // const element = <h1>Bienvenido</h1>;

    const onSubmit = (data, e) => {
        
    }


  return (
    <div>
    <div className="cabeza">
            <img className="logo" src={logo}/>
            
            <div className="nom_doc">
            <form>
                {/* <input
                 type='text' 
                 placeholder='Nombre del documento'
                ></input> */}
                <div className="guardar_btn">
                <button>Guardar cambios</button>
                </div>
            </form>
            </div>
            
            
            <div className="agregar">
                <form> 
                    <input
                        type='text' 
                        placeholder='correo del invitado'
                    ></input>
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