// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './App.css';
import { useData } from './hooks/useData';

function App() {
  const initialFilters = {
    marca: '',
    categoria: '',
    precioMaximo: Infinity,
  };
 
  const [filters, setFilters] = useState(initialFilters);
  const data = useData;

  const filteredData = data.filter(item => {
    const marcaFilter = filters.marca === '' || item.marca === filters.marca;
    const categoriaFilter = filters.categoria === '' || item.categoria === filters.categoria;
    const precioFilter = item.precio <= filters.precioMaximo;
    return marcaFilter && categoriaFilter && precioFilter;
  });

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Puedes aplicar los filtros aquí si lo deseas
    }
  };

  return (
    <>
        <h1>Tabla de productos:</h1>
      <div className='filtros'>

        
        <div>
          <label htmlFor="categoria">Filtrar:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={filters.categoria}
            onChange={handleFilterChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <button onClick={() => setFilters(initialFilters)}>Limpiar Filtros</button>
      </div>
      <table className="rwd-table">
        <thead>
          <tr>
            <th>Referencia</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio iva inc</th>
            
            <th>Adicionar RQ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.categoria}</td>
              <td>{item.precio}</td>
              
              <td>
                <button>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
