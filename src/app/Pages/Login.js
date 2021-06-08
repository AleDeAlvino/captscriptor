import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'



function Login() {

  const {register, formState: { errors }, handleSubmit} = useForm();
    // const element = <h1>Bienvenido</h1>;

    const onSubmit = (data, e) => {
        console.log(data)
        e.target.reset()
        // ReactDOM.render(element, document.getElementById('root'))
    }


  return (
    <div>
      <div className="bold-line"></div>
      <div className="cabeza">
        <img src="../../public/logo.jpeg" alt="logo"></img>
      </div>
      <div className="container">
        <div className="window">
          <div className="overlay"></div>
          <div className="content">
            <div className="welcome">Inicio de sesión</div>
            <div className="subtitle"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-fields">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="input-line full-width"
                name="corr"
                {...register('corr',{
                  required: true,
                  type: 'email'
              })}
              ></input>
              {errors.corr && <span>Ingrese un correo valido</span>}
              <input
                type="password"
                placeholder="Contraseña"
                className="input-line full-width"
                name="pass"
                {...register('pass',{
                  required: true,
                  minLength: 8
              })}
              ></input>
              {errors.pass && <span> Campo requerido con minimo de 8 caracteres </span>}
            </div>
            <div className="spacing">
              o entrar con <span className="highlight">Facebook</span>
            </div>
            <div>
              <button className="ghost-round full-width">Iniciar sesión</button>
            </div>
            </form>
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
