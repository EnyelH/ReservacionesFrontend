import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/reservaciones';

// Obtener reservaciones por nombre
export const obtenerReservacionPorNombre = (nombreTitular) => {
  return axios.get(`${BASE_URL}/nombre/${nombreTitular}`);
};

// Actualizar una reservación
export const actualizarReservacion = (id, reservacion) => {
  return axios.put(`${BASE_URL}/${id}`, reservacion);
};

// Borrar una reservación por fecha
export const borrarReservacion = (fecha) => {
  return axios.delete(`${BASE_URL}/fecha/${fecha}`);
};

// Obtener todas las reservaciones
export const getReservaciones = () => {
  return axios.get(BASE_URL);
};

// Obtener reservaciones por nombre (similar al anterior)
export const getReservacionesPorNombre = (nombreTitular) => {
  return axios.get(`${BASE_URL}/nombre/${nombreTitular}`);
};

// Registrar una nueva reservación
export const registrarReservacion = (reservacion) => {
  return axios.post(BASE_URL, reservacion);
};
