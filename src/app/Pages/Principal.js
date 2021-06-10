import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
import { render } from 'react-dom';
import Login from './Login';

function Sign_in() {
  
      const onSubmit = (data, e) => {
          console.log("holis")
          
      }
  
  
    return (
      <div>
          hola
          <button onclick={onSubmit}>Cerrar Sesion</button>
      </div>
    );
  }
  
  export default Sign_in;