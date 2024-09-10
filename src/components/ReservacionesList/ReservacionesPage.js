import React, { useState, useEffect } from 'react';
import { getReservaciones } from '../../api/reservaciones';
import ReservacionesList from './ReservacionesList';
import './ReservacionesList.css';
import { useNavigate } from 'react-router-dom';

/**
 * Componente para la página de búsqueda de reservaciones.
 * Permite buscar y filtrar reservaciones basadas en diferentes criterios.
 */
const ReservacionesPage = () => {
  // Estado para almacenar todas las reservaciones obtenidas desde la API
  const [reservaciones, setReservaciones] = useState([]);
  

  // Estado para almacenar las reservaciones filtradas según los criterios de búsqueda
  const [filteredReservaciones, setFilteredReservaciones] = useState([]);

  // Estado para almacenar el término de búsqueda introducido por el usuario
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para almacenar el tipo de filtro seleccionado por el usuario
  const [filterType, setFilterType] = useState('Nombre'); // Inicializado para filtrar por nombre

  // Estado para almacenar las opciones de servicio
  const [serviciosOptions, setServiciosOptions] = useState([]);

  // Efecto para obtener las reservaciones desde la API cuando el componente se monta
  useEffect(() => {
    getReservaciones()
      .then(response => {
        setReservaciones(response.data);
        setFilteredReservaciones(response.data); // Cargar inicialmente todas las reservaciones

        // Obtener las opciones únicas de servicios
        const uniqueServicios = [...new Set(response.data.map(r => r.servicios))].filter(s => s);
        setServiciosOptions(uniqueServicios);
      })
      .catch(error => console.error('Error al obtener reservas:', error));
  }, []);

  /**
   * Filtra las reservaciones según el término de búsqueda y el tipo de filtro seleccionado.
   */
  const handleFilter = () => {
    const filtered = reservaciones.filter((reservacion) => {
      if (filterType === 'Nombre') {
        return reservacion.nombreTitularReservacion.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (filterType === 'Fecha') {
        return reservacion.fechaReservacion.includes(searchTerm);
      } else if (filterType === 'Numero mesa') {
        return reservacion.numeroMesa.toString().trim() === searchTerm.trim();
      } else if (filterType === 'Servicio') {
        return reservacion.servicios && reservacion.servicios.toLowerCase() === searchTerm.toLowerCase();
      }
      return false;
    });

    // Actualiza el estado con las reservaciones filtradas
    setFilteredReservaciones(filtered);
  };

  /**
   * Maneja el cambio en el tipo de filtro seleccionado por el usuario.
   * @param {Event} e - El evento del cambio en el select.
   */
  const handleChangeFilterType = (e) => {
    setFilterType(e.target.value);
    setSearchTerm(''); // Reinicia el término de búsqueda al cambiar el tipo de filtro
  };

  /**
   * Maneja el cambio en el término de búsqueda para el filtro de servicio.
   * @param {Event} e - El evento del cambio en el select.
   */
  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hook para manejar la navegación entre rutas
  const navigate = useNavigate();

  const handleCrearReservacion = () => {
    navigate('/reservaciones'); // Redirige al formulario de creación
  };

  return (
    <div className="reservaciones-page">
      <h2>Buscar Reservaciones</h2>
      <div className="filter-container">
        {/* Select para elegir el tipo de filtro */}
        <select value={filterType} onChange={handleChangeFilterType}>
          <option value="Nombre">Nombre</option>
          <option value="Fecha">Fecha</option>
          <option value="Numero mesa">Número de Mesa</option>
          <option value="Servicio">Servicio</option>
        </select>

        {/* aquì se hace que el filtro de busqueda por servicio tambien sea en lista desplegable */}
        {filterType === 'Servicio' ? (
          <select
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          >
            <option value="">Seleccionar un servicio</option>
            {serviciosOptions.map((servicio, index) => (
              <option key={index} value={servicio.toLowerCase()}>
                {servicio}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder={`Buscar por ${filterType}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {/* Botón para aplicar el filtro */}
        <button onClick={handleFilter}>Filtrar</button>
        <button
          className="btn btn-success"
          onClick={() => handleCrearReservacion()}
        >
          Crear reservacion
        </button>
      </div>

      {/* Componente que muestra la lista de reservaciones filtradas */}
      <ReservacionesList reservacionesFiltradas={filteredReservaciones} />
    </div>
  );
};

export default ReservacionesPage;

