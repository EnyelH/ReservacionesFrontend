import React, { useState, useEffect } from 'react';
import { actualizarReservacion, obtenerReservacionPorNombre } from '../api/reservaciones';

const ReservacionUpdate = ({ reservacionId }) => {
  const [reservacion, setReservacion] = useState({
    numeroMesa: '',
    nombreTitularReservacion: '',
    reservaActiva: true,
    fechaReservacion: '',
    cantidadPersonas: ''
  });

  useEffect(() => {
    // Obtener los detalles de la reservación cuando el componente se monte o cambie el reservacionId
    if (reservacionId) {
      obtenerReservacionPorNombre(reservacionId)
        .then(response => {
          // Asumiendo que la API devuelve un solo objeto de reservación
          setReservacion(response.data[0]);
        })
        .catch(error => console.error('Error al obtener reservación:', error));
    }
  }, [reservacionId]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setReservacion({ ...reservacion, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    actualizarReservacion(reservacionId, reservacion)
      .then(response => alert(response.data))
      .catch(error => alert('Error al actualizar reservación:', error));
  };

  return (
    <div>
      <h2>Actualizar Reservación</h2>
      <form onSubmit={manejarEnvio}>
        <label>
          Número de Mesa:
          <input
            type="number"
            name="numeroMesa"
            value={reservacion.numeroMesa}
            onChange={manejarCambio}
          />
        </label>
        <label>
          Nombre del Titular:
          <input
            type="text"
            name="nombreTitularReservacion"
            value={reservacion.nombreTitularReservacion}
            onChange={manejarCambio}
          />
        </label>
        <label>
          Fecha de Reservación:
          <input
            type="date"
            name="fechaReservacion"
            value={reservacion.fechaReservacion}
            onChange={manejarCambio}
          />
        </label>
        <label>
          Cantidad de Personas:
          <input
            type="number"
            name="cantidadPersonas"
            value={reservacion.cantidadPersonas}
            onChange={manejarCambio}
          />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default ReservacionUpdate;
