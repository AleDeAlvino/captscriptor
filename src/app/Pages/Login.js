import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
import Principal from './Principal';
import Login from './Login';
import { render } from 'react-dom';



function Login_f() {

  const {register, formState: { errors }, handleSubmit} = useForm();
  const element = <h4>Usuario o correo incorrecto</h4>;

    const onSubmit = (data, e) => {
        console.log(data)
        e.target.reset()
        fetch("/user/Login", {
          method: "POST",
          body: JSON.stringify({
              email: data.corr,
              password: data.pass
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("Hecho")
          if(data.code==200){
            render(<Principal/>, document.getElementById('Inicio'))
          }else{
            render(element, document.getElementById('message_err'))
          }
        });
    }


  return (
    <div  className="cont_ru">
      <div className="bold-line"></div>
      <div className="cabeza">
        <img className="logo" src={logo}/>
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
            <div id="message_err"></div>
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
        <div className="barra_abajo">shbhj</div>
      </div>
    </div>
  );
}

export default Login_f;
