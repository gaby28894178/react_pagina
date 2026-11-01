import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Falta importar Link
import axios from 'axios';
import './characters.css'
const timeLoader = 200
function Home() {
  const [characters, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const URLBASE = "https://fakestoreapi.com/products"; 

  useEffect(() => {
    let isCurrent = true;
    axios.get(URLBASE)
      .then((response) => {
        if (isCurrent) setCharacter(response.data);
      })
      .catch(() => {
        if (isCurrent) setError("No se pueden cargar los personajes");
      })
      .finally(() => {
        setTimeout(()=>{
          if (isCurrent) setLoading(false);

        },timeLoader);
      });
      
    return () => {
      isCurrent = false;
    };
  }, []);
  // console.log(characters[0]?.id);
  if (error) {
    return (
      <div className="estado-mensaje error">
        <h2>Ups! Algo salió mal</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#f4944f', fontSize: '32px' }}>Sección de Home Inicio</h1>
      <p style={{ color: '#666', fontSize: '18px', marginTop: '10px' }}>
        Lista de productos obtenidos de la API.
      </p>
      {/* el div con el map  */}
        {loading?(
          <div className='producto-loading'>
              <h2>Cargando Catalogo..........</h2>    
          </div>
        ):(
        <div className='productos-conteiner'>
            {
              characters.map((iterador)=>(
                <div key={iterador.key} className='producto-card'>
                  <img src={iterador.image} alt={iterador.title} />

                </div>
              ))
            }

        </div>)}
            


  </div>
  );
}

export default Home;
