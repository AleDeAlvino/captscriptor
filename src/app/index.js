import React, { Fragment, useState } from 'react';
import { render } from 'react-dom';
import Inicio from './Pages/Inicio';
import Login from './Pages/Login';
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
          <Route path="/Login">
            <Login />
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