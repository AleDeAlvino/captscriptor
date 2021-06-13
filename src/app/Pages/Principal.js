import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
// import ReactDOM from 'react-dom'
import logo from '../../public/logo.jpg';
import { render } from 'react-dom';
import Login from './Login';
import Documento from './Documento';
import Inicio from '../Pages/Inicio';

function Principal(props) {

  const {register, formState: { errors }, handleSubmit} = useForm();
  const [docs, setdocs] = useState([]);
//   const [idDoc, setidDoc] = useState([]);
//   const [content, setcontent] = useState([]);
//   var i =0;
//     console.log(props);

    const fetchDocs = () => {
      fetch("/docs/docs_user")
        .then((res) => res.json())
        .then((data) => {
          setdocs(data);
          console.log(data);
        });
    }

    useEffect(() => {
        fetchDocs();
      
    }, []);

    const new_d = (data, e) => {
        console.log("Hola")
        console.log("data de duncion: ", data);
      fetch("/docs/new_doc", {
        method: "POST",
        body: JSON.stringify({
          name_doc: data.nombred,
      }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Hecho")
        console.log(data);
        console.log(data.doc._id);
          render(<Documento idDoc ={data.doc._id} namedoc={data.namedoc}/>, document.getElementById('Inicio'))
      });
        
    }

    
//     const element2 = <h4>Todo salio bien</h4>;
  
      const logoutC = (data, e) => {
          console.log("hola");
          
        fetch("/docs/Logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("Hecho")
            render(<Inicio/>, document.getElementById('Inicio'));
        });
          
      }

      const element = <div>
      <form onSubmit={handleSubmit(new_d)}>
    <h3>Ingresa nombre del documento</h3>
  <input
    type='text'
    placeholder='Nombre del documento'
    name= "nombred"
            {...register('nombred',{
              required: true,
          })}
  ></input>
  <div >
     <button className="crear_btn">Crear nuevo documento</button>
  </div>
  </form>
</div>;

      const nom_in_doc = (data, e) =>{
        render(element, document.getElementById('nom_input'))
      }
      
      function abrir (_id, content, namedoc){
        // console.log(data);
          render(<Documento idDoc ={_id} content={content} namedoc={namedoc}/>, document.getElementById('Inicio'))
      };
  
    return (
      <div>
        <div className='bold-line'></div>
        <div className="cabeza"> 
        <img src={logo} alt="logo" className="logo"/>
        <form onClick={logoutC}>
            <button className="cerrar" >Cerrar Sesion</button>
        </form>
      </div>
        <div className="nuevodocu" onClick={nom_in_doc}></div>
        <div id="nom_input"></div>
        <p className="ndoc">Nuevo documento</p>
        <p className="tdoc">Todos tus documentos</p>
        {docs.map((datos) => {
                    return (
                        <div className="cua_all">
                          <div className="nuevodocu2" onClick={() =>{abrir(datos._id, datos.content, datos.namedoc)}}></div>
                          
                          <p className="ndoc">{datos.namedoc}</p>
                        </div>
                    );
                  })}
      </div>
    );
  }
  
  export default Principal;