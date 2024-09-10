import React, { useState, useEffect } from 'react';
import { borrarReservacion, actualizarReservacion } from '../../api/reservaciones';
import './ReservacionesList.css';

/**
 * Componente que muestra una lista de reservaciones, permite editar, eliminar y ver detalles de reservaciones.
 */
const ReservacionesList = ({ reservacionesFiltradas }) => {
  // Estado para almacenar la lista de reservaciones obtenidas desde la API
  const [reservaciones, setReservaciones] = useState([]);

  // Estado para manejar la reservación que se está editando
  const [editReservacion, setEditReservacion] = useState(null);

  // Estado para manejar la reservación cuyo detalle se está viendo
  const [selectedReservacion, setSelectedReservacion] = useState(null);

  useEffect(() => {
    setReservaciones(reservacionesFiltradas);
  }, [reservacionesFiltradas]);

  /**
   * Maneja la eliminación de una reservación.
   * @param {string} fecha - La fecha de la reservación a eliminar.
   */
  const handleEliminar = (fecha) => {
    borrarReservacion(fecha)
      .then(() => {
        // Actualiza el estado para eliminar la reservación de la lista
        setReservaciones(reservaciones.filter(reservacion => reservacion.fechaReservacion !== fecha));
        alert('Reservación eliminada');
      })
      .catch(error => alert('Error al eliminar la reservación:', error));
  };

  /**
   * Maneja el cierre del formulario de edición.
   */
  const handleClose = () => {
    setEditReservacion(null);
  };

  /**
   * Carga los datos de una reservacion en el formulario de edicion.
   * @param {Object} reservacion - La reservacion que se desea editar.
   */
  const handleModificar = (reservacion) => {
    setEditReservacion(reservacion);
  };

  /**
   * Muestra los detalles de una reservacion.
   * @param {Object} reservacion - La reservación cuyos detalles se desean ver.
   */
  const handleDetalles = (reservacion) => {
    setSelectedReservacion(reservacion);
  };

  /**
   * Maneja el envio del formulario de edicion.
   * @param {Event} e - El evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editReservacion) {
      actualizarReservacion(editReservacion.id, editReservacion)
        .then(() => {
          alert('Reservación actualizada exitosamente');
          setEditReservacion(null); // Limpia el formulario de edicion después de actualizar
        })
        .catch(error => alert('Error al actualizar la reservación:', error));
    }
  };

  /**
   * Maneja los cambios en los campos del formulario de edicion.
   * @param {Event} e - El evento del cambio en el formulario.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditReservacion({ ...editReservacion, [name]: value });
  };

  return (
    <div className="reservaciones-container">
      <h2 style={{ textAlign: 'center' }}>Lista de Reservaciones</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservaciones.map(reservacion => (
              <tr key={reservacion.id}>
                <td>{reservacion.nombreTitularReservacion}</td>
                <td>{reservacion.reservaActiva ? 'Activa' : 'Inactiva'}</td>
                <td>{reservacion.fechaReservacion}</td>
                <td>
                  <div className="reservacion-buttons">
                    <button
                      className="btn-detalles"
                      onClick={() => handleDetalles(reservacion)}
                    >
                      Detalles
                    </button>
                    <button
                      className="btn-modificar"
                      onClick={() => handleModificar(reservacion)}
                    >
                      Modificar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(reservacion.fechaReservacion)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario de edicion */}
      {editReservacion && (
        <div className="form-container">
          <button className="btn-close" onClick={handleClose}>X</button>
          <form onSubmit={handleSubmit} className="edit-form">
            <h3>Editar Reservación</h3>
            <label>
              Número de Mesa:
              <input
                type="number"
                name="numeroMesa"
                value={editReservacion.numeroMesa}
                onChange={handleChange}
              />
            </label>

            <label>
              Estado de la reservacion:
              <input
                type="checkbox"
                name="reservaActiva"
                checked={editReservacion.reservaActiva}
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
                  <button className="dropdown-item" type="button" onClick={() => handleChange('Servicio a la mesa')}>
                    Servicio a la mesa
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button" onClick={() => handleChange('Cumpleaños')}>
                    Cumpleaños
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button" onClick={() => handleChange('Mariachis')}>
                    Mariachis
                  </button>
                </li>
              </ul>
            </div>

            <label>
              Nombre del Titular:
              <input
                type="text"
                name="nombreTitularReservacion"
                value={editReservacion.nombreTitularReservacion}
                onChange={handleChange}
              />
            </label>
            <label>
              Fecha de Reservación:
              <input
                type="date"
                name="fechaReservacion"
                value={editReservacion.fechaReservacion}
                onChange={handleChange}
              />
            </label>
            <label>
              Cantidad de Personas:
              <input
                type="number"
                name="cantidadPersonas"
                value={editReservacion.cantidadPersonas}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn-modificar">Guardar Cambios</button>
          </form>
        </div>
      )}

      {/* Detalles de la reservación */}
      {selectedReservacion && (
        <div className="detalles-reservacion">
          <h3>Detalles de la Reservación</h3>
          <p><strong>Número de Mesa:</strong> {selectedReservacion.numeroMesa}</p>
          <p><strong>Nombre del Titular:</strong> {selectedReservacion.nombreTitularReservacion}</p>
          <p><strong>Estado:</strong> {selectedReservacion.reservaActiva ? 'Activa' : 'Inactiva'}</p>
          <p><strong>Servicio:</strong> {selectedReservacion.servicios || 'No se ha seleccionado ningún servicio'}</p>
          <p><strong>Fecha de Reservación:</strong> {selectedReservacion.fechaReservacion}</p>
          <p><strong>Cantidad de Personas:</strong> {selectedReservacion.cantidadPersonas}</p>
          <button onClick={() => setSelectedReservacion(null)} className="btn-cerrar">
            Cerrar los detalles
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservacionesList;
