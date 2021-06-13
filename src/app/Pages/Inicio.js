import React, { useState, useEffect } from "react";
import logo from '../../public/logo.jpg';
import edu from '../../public/edu.png';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function Inicio () {

    return (
      <div>
        <div className="cabeza"> 
        <img className="logo" src={logo}/>
        </div>
        <div className="gatito">
          <img src={edu} className="educacion"/>
        </div>
          <div>
            {/* Boton que te dirige a iniciar sesion */}
            <button className="inicio"><Link to="/Login">Iniciar sesión</Link></button>
            {/* Boton que te dirige a Crear una cuenta */}
            <button className="crear"><Link to="/Sign_in">Crear cuenta</Link></button>
          </div>
        <div>
          <div className="texto">
          Crea documentos PDF junto con tu equipo de trabajo con la ayuda de CAPT SCRIPTOR.
          <br></br>
          Dessarrolla tu creatividad ahora mismo. 
          <br></br>
          ¡Crea una cuenta!
        </div>
      </div>
      </div>
    );
  }

export default Inicio;
