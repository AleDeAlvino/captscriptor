import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
import { render } from 'react-dom';
import Login from './Login';

function Sign_in() {

    const {register, formState: { errors }, handleSubmit} = useForm();
      // const element = <h1>Bienvenido</h1>;
  
      const onSubmit = (data, e) => {
          
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
  
  
    return (
      <div>
        <div className='bold-line'></div>
        <div className="cabeza"> 
        <img src={logo} alt="logo" class="logo"/>
        <img src="menu.png" alt="menu" class="menu"/>
      </div>
        <div className="nuevodocu"></div>
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
  
  export default Sign_in;