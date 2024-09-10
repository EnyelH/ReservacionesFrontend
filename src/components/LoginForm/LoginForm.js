// src/components/LoginForm/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth'; // Función para hacer la solicitud de login
import './LoginForm.css'; // Asegúrate de tener estilos adecuados

/**
 * Componente para el formulario de inicio de sesión.
 */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token); // Guarda el token en el localStorage
        navigate('/reservaciones'); // Redirige a la página de reservaciones
      })
      .catch(error => alert('Error de autenticación:', error));
  };

  return (
    <div className="login-form">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
