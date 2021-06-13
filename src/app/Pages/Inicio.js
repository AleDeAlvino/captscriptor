import React, { useState, useEffect } from "react";
import Login from './Login';
import logo from '../../public/logo.jpg';
import edu from '../../public/edu.png';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// const Root = () =>(

//   <Router>
//           <Route path="/Log_in" component={Login}>
//             {/* <Log_in /> */}
//           </Route>
//     </Router>
// );



function Inicio () {

  

    return (
      // <div>hola</div>
      <div>
        <div className="cabeza"> 
        <img className="logo" src={logo}/>
        </div>
        <div className="gatito">
          <img src={edu} className="educacion"/>
        </div>
          <div>
            <button className="inicio"><Link to="/Login">Iniciar sesión</Link></button>
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
        {/* <div>
        <Link to="/Principal">Principal</Link>
        </div> */}
      </div>
      </div>
    );
  }

export default Inicio;

// function Log_in(){
//   return (
//     <div className="container mt-5">
//         <Login />
//     </div>
//  );
// }