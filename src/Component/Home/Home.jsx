import { useState, useEffect, useRef  } from 'react'

import './Home.css';
import { createClient } from '@supabase/supabase-js';
import residente1 from './residente2.jpg';

const API = import.meta.env.VITE_APP_API;



function Home() {
  const [texto, setTexto] = useState('');
  const [consulta, setConsulta] = useState('');
  const [nombre, setnombre] = useState('');
  const [id, setId] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [num2, setNum2] = useState('');
  const [id2, setId2] = useState('');

  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY);
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
        const data = await res.json();
        
        
        setTexto("Respuesta generada 😊. Apreta el boton de visualizar respuesta.")
       
        //getUsers() 

      } else {
        // Handle the error if needed
        console.error('Failed to fetch data');

        //setTexto("Error de comunicacion con los servidores 😔. por favor vuelva a intentarlo.");

        //getUsers() 
      }

    } catch (error) {
        // Handle fetch error
        console.error('Error fetching data:', error);

        //setTexto("Error de comunicacion con los servidores 😔. por favor vuelva a intentarlo.");

        //getUsers() 
      }


      //getUsers() 
      setTexto("Respuesta generada 😊. Apreta el boton de visualizar respuesta.")

  };

  //---------------------------llamar informacion--------------

  const getUsers = async () => {

    const { data, error } = await supabase
    .from('backendpythonmed')
    .select('Respuesta')

    setRespuesta (data.map(row => row.Respuesta))

    const num =data.length-1


    console.log(data[num].Respuesta);


    setTexto(data[num].Respuesta);


    
  };


  
  const getInicio = async () => {

    const { data, error } = await supabase
    .from('backendpythonmed')
    .select('Respuesta')

    setRespuesta (data.map(row => row.Respuesta))

    const num =data.length-1


    console.log(data[num]);


    
  };


  const getid = async () => {


    const { data, error3 } = await supabase
    .from('backendpythonmed')
    .select('id')

    setId (data.map(row => row.id))

    setNum2(data.length)

    const num= data.length-1

    console.log(data[num]);

    setId2(id[num]);

    
  };

  //-----------------------------delete-------------

  const deleteUsers = async () => {

    getid()
    const { data, error } = await supabase.from('backendpythonmed').delete().eq('id', id2)
    console.log(data);

    
  };

  //---------------------------super delete-----------

  const deleteall = async () => {

    getid()
    const { data, error } = await supabase.from('backendpythonmed').delete().eq('id', id2)
    console.log(data);

    setnombre("");
    setTexto("Hola 👨‍⚕️, por favor introduce tu consulta");
    
  };

  //--------------------------------------------------



  useEffect(() => {
    
    getInicio()

    setTexto("Hola 👨‍⚕️, por favor introduce tu consulta sobre el caso clínico");
    
  }, []);

  //para no borrarlos por si los necesito
  //<button className="boton" onClick={() => { getUsers() }}>Hazme click</button> 
  //<button className="boton" onClick={() => { deleteUsers() }}>Hazme click</button>

  //     <div className="card2">
    //   <p>{"Conexion Chat Médico"}</p>
      // </div> 
  

  return (
    <div className="card">

    <div className="card11">
    <h1>{"GRAY MATTER MED"}</h1>
    </div>

    
    <form onSubmit={handleSubmit}>


    <div className="card3">
    
    <div className="logo-container">
        
      </div>

      <div className="card">
      
      <p>{"Conexion Chat Médico"}</p>
      
      <div className="card12">
      
      <div className="card13">
      
      <p>{"El uso queda exclusivamente destinado para profesionales del área de la salud ya que se requiere criterio para realizar la consulta del caso clínico y discernir en la certeza de las respuestas generadas por la IA"}</p>
     
      </div>
        <img src={residente1} className="App-logo" alt="logo" />  
      </div>

      <div className="card13">
      <p className="respuestaclase">{texto ? texto : "Vuelve a cargar la respuesta por favor 😊."}</p>
      </div>

      <div className="card3">
        

        
        

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
    
    <div className="card9">

    <div className="card7">
    <button className="boton" onClick={() => { getUsers() }} disabled={texto === 'Generando respuesta'}>Mostrar respuesta</button>
    </div> 

    <div className="card7">
    <button className="boton" onClick={() => { deleteall() }}>Limpiar pantalla</button>
    </div> 

    </div>

    </div>
    
  );

}


export default Home