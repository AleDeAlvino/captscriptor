import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import options from "./data";

const form_invitados = (props) => {
  // console.log(this.props.estados);
  // useEffect(() => {
  //   //setSelectedOptions([{ label: "All", value: "*" }, ...props.options]);
  //   // console.log(props.estados);
  // }, []);

  const [Cont, setCont] = useState("");
  const {register, formState: { errors }, handleSubmit} = useForm();

  return (
    <div className="agregar">
    <form onSubmit={handleSubmit(props.guardar)}> 
        <input
            type='text' 
            placeholder='correo del invitado'
            name="inv"
        ></input>
        <div className="agregar_btn">
            <button>Agregar</button>
        </div>
    </form>
</div>
  );
};

export default form_invitados;