import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import logo from '../../public/logo.jpg';
import { render } from 'react-dom';
import Login from './Login';
import Documento from './Documento';

function Principal(props) {

  //constantes que necesita el useform para validar
  const {register, formState: { errors }, handleSubmit} = useForm();
  const [docs, setdocs] = useState([]);

  //Funcion encargada de buscar todos los documentos pertenecientes al usuario o a los que haya sido invitado a través de la ruta docs_user
    const fetchDocs = () => {
      fetch("/docs/docs_user")
        .then((res) => res.json())
        .then((data) => {
          setdocs(data);
          console.log(data);
        });
    }

    //funcion encargada de ejecutar fetchDocs al momento de cargar la pagina
    useEffect(() => {
        fetchDocs();
      
    }, []);

    //Funcion para crear un nuevo documento a través de la ruta new_doc
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

   //Funcion para cerrar sesion a través de la ruta Logout
      const logoutC = (data, e) => {
          console.log("hola");
          
        fetch("/docs/Logout", {
          method: "POST",
          body: JSON.stringify({
            hola: "hola",
        }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("Hecho")
        });
        render(<Login/>, document.getElementById('Inicio'));
      }

    //Elemento que se renderiza a traves de la funcion nom_in_doc
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

      //Funcion encargada de renderizar el formulario para ingresar nombre del archivo al momento de querer crearlo
      const nom_in_doc = (data, e) =>{
        render(element, document.getElementById('nom_input'))
      }
      
      //Funcion encargada de abrir el documento que previamente ya fue creado
      function abrir (_id, content, namedoc){
          render(<Documento idDoc ={_id} content={content} namedoc={namedoc}/>, document.getElementById('Inicio'))
      };
  
    return (
      <div>
        <div className='bold-line'></div>
        <div className="cabeza"> 
        <img src={logo} alt="logo" className="logo"/>
            <button className="cerrar" onClick={logoutC}>Cerrar Sesion</button> {/* Cierra la sesion y te dirige al login */}
      </div>
        <div className="nuevodocu" onClick={nom_in_doc}></div>
        <div id="nom_input"></div>
        <p className="ndoc">Nuevo documento</p>
        <p className="tdoc">Todos tus documentos</p>
        {docs.map((datos) => {  {/* mapeo de todos los documentos encontrados por la funcion fetchDoc y almacenados en la variable docs */}
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