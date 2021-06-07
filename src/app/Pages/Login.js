import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import "../Pages/Login.css";

function Login() {
  return (
    <div>
      <div className="bold-line"></div>
      <div className="cabeza">
        <img src="logo.png" alt="logo"></img>
      </div>
      <div className="container">
        <div className="window">
          <div className="overlay"></div>
          <div className="content">
            <div className="welcome">Inicio de sesión</div>
            <div className="subtitle"></div>
            <div className="input-fields">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="input-line full-width"
              ></input>
              <input
                type="password"
                placeholder="Contraseña"
                className="input-line full-width"
              ></input>
            </div>
            <div className="spacing">
              o entrar con <span className="highlight">Facebook</span>
            </div>
            <div>
              <button className="ghost-round full-width">Iniciar sesión</button>
            </div>
            <div>
              <button className="ghost-round full-width2">
                Crear cuenta nueva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
