//Asssment task
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);


  // Implement a debouncing mechanism to trigger the API call only when 
  // the user stops typing for a specified duration (say 500 milliseconds).
  useEffect(() => {
    const delay = 500;
    let timeoutId;

    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        setPokemonData(response.data);
        setError(null);
      } catch (error) {
        setError('Pokemon not found');
        setPokemonData(null);
      }
      
    };

    const debounceFetchPokemonData = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchPokemonData, delay);
    };

    if (pokemonName) {
      debounceFetchPokemonData();
    } else {
      setPokemonData(null);
      setError(null);
    }

    return () => clearTimeout(timeoutId);
  }, [pokemonName]);

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };



  return (
    <div className='App'>
      <input type="text" value={pokemonName} onChange={handleInputChange} placeholder="Enter Pokemon name or code number of pokemon" />
      {error && <p>{error}</p>}
      {pokemonData && (
        <div className="pokemon-card">
           {/* Displaying the Pokemon's name and stats in a card format. */}
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <h3>Abilities:</h3>
          <ul>
             {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
