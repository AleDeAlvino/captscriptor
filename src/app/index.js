import React, { Fragment, useState } from 'react';
import { render } from 'react-dom';
import Inicio from './Pages/Inicio';
import Login from './Pages/Login';
import Sign_in from './Pages/Sign_in';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  function Index () {

  

    return (
      // <div>hola</div>
      <Router>
      <div>
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Sign_in">
            <Sign_in />
          </Route>
          <Route path="/">
            <Inicio />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }



render(<Index/>, document.getElementById('Inicio'));