import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
import { render } from 'react-dom';
import Login from './Login';
import Documento from './Documento';

function Principal(props) {

    console.log(props);

    const new_d = (data, e) => {
        console.log("Hola")
        console.log("data de duncion: ", data);
      fetch("/docs/new_doc", {
        method: "POST",
        body: JSON.stringify({
          name_doc: data.nombred,
      }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Hecho")
          render(<Documento/>, document.getElementById('Inicio'))
      });
        
    }

    const {register, formState: { errors }, handleSubmit} = useForm();
    const element2 = <h4>Todo salio bien</h4>;
      const element = <div>
          <form onSubmit={handleSubmit(new_d)}>
        <h3>Ingresa nombre del documento</h3>
      <input
        type='text'
        placeholder='Nombre del documento'
        name= "nombred"
                {...register('nombred',{
                  required: true,
              })}
      ></input>
      <div className="crear_btn">
         <button>Crear nuevo documento</button>
      </div>
      </form>
</div>;
  
      const onSubmit = (data, e) => {
          console.log("hola");
          
        fetch("/docs/Logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("Hecho")
            render(<Login/>, document.getElementById('Inicio'))
        });
          
      }

      const nom_in_doc = (data, e) =>{
        render(element, document.getElementById('nom_input'))
      }
  
  
    return (
      <div>
        <div className='bold-line'></div>
        <div className="cabeza"> 
        <img src={logo} alt="logo" className="logo"/>
        <img src="menu.png" alt="menu" className="menu"/>
      </div>
        <div className="nuevodocu" onClick={nom_in_doc}></div>
        <div id="nom_input"></div>
        <p className="ndoc">Nuevo documento</p>
        <div className="doc1"></div>
        <div className="doc2"></div>
        <div className="doc3"></div>
        <p className="tdoc">Todos tus documentos</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <button className="salir">Cerrar Sesion</button>
        </form>
      </div>
    );
  }
  
  export default Principal;