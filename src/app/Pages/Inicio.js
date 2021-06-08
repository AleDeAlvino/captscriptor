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
        <Link to="/Login">Log in</Link>

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