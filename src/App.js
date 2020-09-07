import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect( () => {

    api.get('/repositories')
    .then(response => {
      const { data } = response;
      setRepositories(data)
    });

  }, []);

  async function handleAddRepository() {
    
    const { data } = await api.post('/repositories', {
      title: `Novo Repositorio ${Date.now()}`
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    
    api.delete('/repositories/' + id)
    .then(response => {
      const newRepositories = repositories.filter(repositorie => repositorie.id !== id);
      setRepositories(newRepositories);
    });

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repositories.map(repositorie => {
            return (
              <li key={repositorie.id}>
                <span>{repositorie.title}</span>  
                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
                </button>
              </li>
            );
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
