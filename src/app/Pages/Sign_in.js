import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
import { render } from 'react-dom';
import Login from './Login';



function Sign_in() {

  const {register, formState: { errors }, handleSubmit} = useForm();
    // const element = <h1>Bienvenido</h1>;

    const onSubmit = (data, e) => {
        console.log(data)
        e.target.reset()
        // ReactDOM.render(element, document.getElementById('root'))
        fetch("/user/SignIn", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
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
            render(<Login/>, document.getElementById('Inicio'))
          });
    }


  return (
    <div>
        {/* <div className='bold-line'></div> */}
        <div className="cabeza">
            <img className="logo" src={logo}/>
        </div>
        <div className='container'>
            <div className='window'>
                <div className='overlay'></div>
                <div className='content'>
                    <div className='welcome'>¡Hola!</div>
                    <div className='subtitle'>Antes de utilizar nuestros servicios, debe crear una cuenta.</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-fields'>
                        <input 
                            type='text' 
                            placeholder='Nombre de usuario' 
                            className='input-line full-width'
                            {...register('name',{
                                required: true,
                            })}>
                        </input>
                        {errors.name && <span> Campo requerido </span>}
                        <input 
                            type='email' 
                            placeholder='Correo electrónico' 
                            className='input-line full-width'
                            {...register('corr',{
                                required: true,
                                type: 'email'
                            })}>
                        </input>
                        {errors.corr && <span>Ingrese un correo valido</span>}
                        <input 
                            type='password'
                            placeholder='Contraseña'
                            className='input-line full-width'
                            {...register('pass',{
                                required: true,
                                minLength: 8
                            })}>
                        </input>
                        {errors.pass && <span> Campo requerido con minimo de 8 caracteres </span>}
                    </div>
                    <div><button className='ghost-round full-width'>Crear cuenta</button></div>
                    </form>
                </div>
            </div>
            <div className="barra_abajo">shbhj</div>
        </div>
    </div>
  );
}

export default Sign_in;