import React, { useState } from 'react';
import { registrarReservacion } from '../../api/reservaciones';
import { useNavigate } from 'react-router-dom'; // Para la navegación entre rutas
import './ReservacionesForm.css';

/**
 * Componente para el formulario de registro de una nueva reservación.
 */
const ReservacionForm = () => {
  // Estado para almacenar los datos de la reservación
  const [reservacion, setReservacion] = useState({
    numeroMesa: '',
    nombreTitularReservacion: '',
    reservaActiva: false,
    fechaReservacion: '',
    cantidadPersonas: '',
    servicios: '' // Nuevo campo para el servicio seleccionado
  });

  // Hook para manejar la navegación entre rutas
  const navigate = useNavigate();

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Event} e - El evento del cambio en el formulario.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Actualiza el estado de la reservación según el tipo de campo (checkbox o texto)
    setReservacion({ ...reservacion, [name]: type === 'checkbox' ? checked : value });
  };

  /**
   * Maneja la selección de un servicio desde el menú desplegable.
   * @param {String} servicio - El servicio seleccionado.
   */
  const handleSelectServicio = (servicio) => {
    setReservacion({ ...reservacion, servicios: servicio });
  };

  /**
   * Maneja el envío del formulario para registrar la reservación.
   * @param {Event} e - El evento del envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la API para registrar la reservación
    registrarReservacion(reservacion)
      .then(response => alert(response.data))
      .catch(error => alert('Error al registrar reservación:', error));
  };

  /**
   * Navega a la página de reservaciones.
   */
  const handleGoToReservaciones = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Número de Mesa:
          <input
            type="number"
            name="numeroMesa"
            value={reservacion.numeroMesa}
            onChange={handleChange}
          />
        </label>
        <label>
          Estado de la Reservación:
          <input
            type="checkbox"
            name="reservaActiva"
            checked={reservacion.reservaActiva}
            onChange={handleChange}
          />
        </label>

        {/* Dropdown para seleccionar un servicio */}
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            ¿Qué servicio desea?
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button className="dropdown-item" type="button" onClick={() => handleSelectServicio('Servicio a la mesa')}>
                Servicio a la mesa
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button" onClick={() => handleSelectServicio('Cumpleaños')}>
                Cumpleaños
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button" onClick={() => handleSelectServicio('Mariachis')}>
                Mariachis
              </button>
            </li>
          </ul>
        </div>

        {/* Mostrar el servicio seleccionado */}
        {reservacion.servicios && (
          <p>Servicio seleccionado: {reservacion.servicios}</p>
        )}

        <label>
          Nombre del Titular:
          <input
            type="text"
            name="nombreTitularReservacion"
            value={reservacion.nombreTitularReservacion}
            onChange={handleChange}
          />
        </label>
        <label>
          Fecha de Reservación:
          <input
            type="date"
            name="fechaReservacion"
            value={reservacion.fechaReservacion}
            onChange={handleChange}
          />
        </label>
        <label>
          Cantidad de Personas:
          <input
            type="number"
            name="cantidadPersonas"
            value={reservacion.cantidadPersonas}
            onChange={handleChange}
          />
        </label>
        {/* Botón para enviar el formulario y registrar la reservación */}
        <button className="margen-boton" type="submit">Registrar</button>
        {/* Botón para navegar a la página de reservaciones */}
        <button type="button" onClick={handleGoToReservaciones}>
          Ver Reservaciones
        </button>
      </form>
    </div>
  );
};

export default ReservacionForm;
