import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Falta importar Link
import axios from 'axios';
import './characters.css'
function Home() {
  const [characters, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const URLBASE = "https://rickandmortyapi.com/api/character"; 

  useEffect(() => {
    let isCurrent = true;
    axios.get(URLBASE)
      .then((response) => { // Corregido: 'respose' a 'response'
        if (isCurrent) setCharacter(response.data.results);
      })
      .catch(() => {
        if (isCurrent) setError("No se pueden cargar los personajes");
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });
      
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#f4944f', fontSize: '32px' }}>Sección de Home Inicio</h1>
      <p style={{ color: '#666', fontSize: '18px', marginTop: '10px' }}>
        Lista de personajes obtenidos de la API.
      </p>

      {loading && <p>Cargando personajes...</p>}
      
      {error && <p>{error}</p>} {/* Corregido: 'erro' a 'error' */}
      
      {!loading && !error && ( // Corregido: 'isloading' a 'loading'
        <div className="character-container">
          {characters.map((character) => (
            <article  key={character.id}>
              {/* Añadido 'to' para que el Link sea válido */}
              <Link to={`/character/${character.id}`}>
                <img src={character.image} alt={character.name} />
              </Link>
              <h3>{character.name}</h3>
              <p>Especie: {character.species}</p>
            </article>
          ))} {/* Corregido: el cierre del map y del div estaban invertidos */}
        </div>
      )}
    </div>
  );
}

export default Home;
