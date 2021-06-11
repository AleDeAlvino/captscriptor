import React, { useState, useEffect } from "react";
import Login from './Login';
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
        <div>
        <Link to="/Login">Log in</Link>
        </div>
        <div>
        <Link to="/Sign_in">Sign in</Link>
        </div>
        <div>
        <Link to="/Documento">Documento</Link>
        </div>
        <div>
        <Link to="/Principal">Principal</Link>
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