import React, { useState, useEffect } from "react";
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Inicio () {

  

    return (
      // <div>hola</div>
      <Router>
      <div>
        
          <Link to="/Log_in">Log in</Link>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Log_in">
            <Log_in />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }

export default Inicio;

function Log_in(){
  return (
    <div className="container mt-5">
        <Login />
    </div>
 );
}