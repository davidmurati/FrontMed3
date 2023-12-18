import { useState, useEffect, useRef  } from 'react'

import './Home.css';

const API = import.meta.env.VITE_APP_API;


function Homecopia() {
  const [texto, setTexto] = useState('');
  const [consulta, setConsulta] = useState('');
  const [nombre, setnombre] = useState('');
  const [id, setId] = useState('');

  //-----------------------------verificacion



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

    setTexto("Generando respuesta");

    // recuerda que tengo que enviar la consulta lo cual es nombre pero es en si la pregunta
    const res = await fetch(`${API}/resultado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //----------------colocar consulta
        consulta: nombre,
      }),
    });
     await res.json();

     if (res.ok) {
        //const data = await res.json();
       
        getUsers() 

      } else {
        // Handle the error if needed
        console.error('Failed to fetch data');

        getUsers() 
      }

    } catch (error) {
        // Handle fetch error
        console.error('Error fetching data:', error);

        getUsers() 
      }


    // aqui haces lo del get para de una vez reflejar la respuesta

    
    //getUsers()
    

  };

  //---------------------------llamar informacion--------------

  const getUsers = async () => {

    
    const res = await fetch(`${API}/resultado`);
    const data = await res.json();

//[0] es porque primero es un array luego dentro esta el arreglo y saco la variable respuesta sin el id

    console.log((data[0]['_id']));
    const data2=JSON.stringify(data[0]);

    console.log(data.length)
    const n= data.length-1


    setTexto((data[n]['Respuesta']));

    deleteUsers ()
    
  };

  //-----------------------------delete-------------

  const deleteUsers = async () => {

    const res1 = await fetch(`${API}/resultado`);
    const data1 = await res1.json();
    console.log(data1.length)
    const n= data1.length-1
    setId(data1[n]['_id']);

    const res = await fetch(`${API}/resultado/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
    
  };

  //---------------------------super delete-----------

  const deleteall = async () => {


    const res = await fetch(`${API}/resultado`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      setnombre("");
      setTexto("");
    
  };

  //--------------------------------------------------



  useEffect(() => {

    setTexto("Hola ¿Cual es tu consulta?");
    
  }, []);

  //para no borrarlos por si los necesito
  //<button className="boton" onClick={() => { getUsers() }}>Hazme click</button> 
  //<button className="boton" onClick={() => { deleteUsers() }}>Hazme click</button>
  

  return (
    <div className="row">
    <form onSubmit={handleSubmit}>


    <div className="card3">
    
    <div className="logo-container">
        
      </div>

      <div className="card">
      
      <div className="card2">
      <h4>{"Acceso a las IA disponibles de lenguaje de procesamiento natural sin nececidad de VPN"}</h4>
      </div>

      <div className="card2">
        <p>{"Conexion Chat Médico"}</p>

        <p>{texto}</p>
        

        <label>
        Consulta:
        </label>
        </div>
        <div className="card">

        <textarea
            className="texto"
            value={nombre}
            onChange={(e) => setnombre(e.target.value)}
            ref={(textarea) => {
            if (textarea) {
            // Asegura que el texto se desplaza automáticamente al final del textarea
            textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
            }
            }}
        />
    
        </div>

      <div className="card2">
      <button className="boton" type="submit" disabled={texto === 'Generando respuesta'}>Enviar</button  >
      </div> 


      </div> 
      
      </div>
   

    </form>

    <div className="card2">
    <button className="boton" onClick={() => { deleteall() }}>Limpiar pantalla</button>
    </div> 


    </div>
    
  );

}


export default Homecopia