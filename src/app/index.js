import React, { Fragment, useState } from 'react';
import { render } from 'react-dom';
import Inicio from './Pages/Inicio';
import Login from './Pages/Login';
import Sign_in from './Pages/Sign_in';
import Documento from './Pages/Documento'
import Principal from './Pages/Principal'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  function Index () {

  

    return (
      <div>
      <Router>
      <div>
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Sign_in">
            <Sign_in />
          </Route>
          <Route exact path="/Documento">
            <Documento />
          </Route>
          <Route exact path="/Principal">
            <Principal />
          </Route>
          <Route exact path="/">
            <Inicio />
          </Route>
          <Route render={() => <h1>Not found!</h1>} />
        </Switch>
      </div>
    </Router>
    </div>
    );
  }



render(<Index/>, document.getElementById('Inicio'));