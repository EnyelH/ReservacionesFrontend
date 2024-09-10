import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReservacionesPage from './components/ReservacionesList/ReservacionesPage';
import ReservacionForm from './components/reservacionForm/ReservacionesForm';
// index.js o App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Gestión de Reservaciones</h1>
        <Routes>
          <Route path="/reservaciones" element={<ReservacionForm />} />
          <Route path="/" element={<ReservacionesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


