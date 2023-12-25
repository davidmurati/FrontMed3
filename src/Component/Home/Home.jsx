import { useState, useEffect, useRef  } from 'react'

import './Home.css';
import { createClient } from '@supabase/supabase-js';
import { Toaster, toast } from 'sonner';

import gayMatter from './GRAY_MATTER-3.png';
import residente1 from './residente2.jpg';
import EfectoDesencriptarTexto from "../Efectos/EfectoDesencriptarTexto.jsx";
import EfectoEscritura from "../Efectos/EfectoEscritura.jsx";


const API = import.meta.env.VITE_APP_API;



function Home() {
  const [texto, setTexto] = useState('');
  const [consulta, setConsulta] = useState('');
  const [nombre, setnombre] = useState('');
  const [id, setId] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [num2, setNum2] = useState('');
  const [id2, setId2] = useState('');

  //-----------------------------verificacion
  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY);


  //-----------------------------gemini


  //-----------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

    setTexto("Generando respuesta"+textoE);
    //setTexto(textoE);
    
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
     //await res.clone().json(); //clone es para solventar un error que no he solventado con respecto al backend
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


      getUsers() 
      //setTexto("Respuesta generada 😊. Apreta el boton de visualizar respuesta.")

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
    setTexto("Hola 😎, por favor introduce tu consulta");
    
  };

  //--------------------------------------------------



  useEffect(() => {
    
    getInicio()

    setTexto("Hola 😎, por favor introduce tu consulta");
    
  }, []);

  //para no borrarlos por si los necesito
  //<button className="boton" onClick={() => { getUsers() }}>Hazme click</button> 
  //<button className="boton" onClick={() => { deleteUsers() }}>Hazme click</button>

  //     <div className="card2">
    //   <p>{"Conexion Chat Médico"}</p>
      // </div> 

      //--------------------------- mostrar la imagen

      const [selectedImage, setSelectedImage] = useState(null);

      const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImage(imageUrl);
      };

      //----------------------------------------------
  
      
      const TextoSubTitulo = "Conexión Chat"

      const [textoE, setTextE] = useState("...")
      const [bucle, setBucle] = useState(false) 
      const [speed, setSpeed] = useState(1000)

      const copiarAlPortapapeles =()=>{ 
          var aux = document.createElement("input");
          aux.setAttribute("value", texto); document.body.appendChild(aux);
          aux.select();
          document.execCommand("copy");
          document.body.removeChild(aux);
          //alert("se copió al portapapeles");
          }

  return (
    <div className="card">

    <div className="card11">

    <>
    <h1>GRAY MATTER by gemini</h1>
    
    </>

    </div>

    
    <form onSubmit={handleSubmit}>


    <div className="card3">
    
    <div className="logo-container">
         
    </div>

      <div className="card">
      
      <p>
        <EfectoEscritura
        text={TextoSubTitulo}
        mleftInicial={700}
        transitionTime={5}
        tickCambioletra={500}
        randCar={null} />
      </p>
      
      <div className="card12">
      
      <div className="card13">
      <div className="card1">
        
      <img src={gayMatter} className="App-logo3" alt="logo" /> 
      
      <p>{"El uso requiere criterio para realizar la consulta del caso y discernir en la certeza de las respuestas generadas por la IA"}</p>
      </div>
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
      <Toaster />
      <button className="boton" type="submit" disabled={texto === 'Generando respuesta...'} onClick={() => { toast('Generando respuesta, espere por favor')}}>Enviar</button  >
      </div> 
      

      </div> 
      
      </div>
   

    </form>
    
    <div className="card9">

    <div className="card7">
    <Toaster />
    <button className="boton" disabled={texto === 'Hola 😎, por favor introduce tu consulta' || texto === 'Generando respuesta...'} onClick={() => { copiarAlPortapapeles() , toast('se copió al portapapeles')}}>Copiar texto</button>
    </div> 

    <div className="card7">
    <button className="boton" onClick={() => { deleteall() }}>Limpiar pantalla</button>
    </div> 

    </div>

    </div>
    
  );

}


export default Home