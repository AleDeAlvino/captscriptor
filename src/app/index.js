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

render(<Inicio/>, document.getElementById('Inicio'));