// frontend/src/components/RecuperarHoraForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook para redirigir
import axios from 'axios';
import "./RecuperarHoraForm.css";

const RecuperarHoraForm = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Rangodefecha: '',
    FechaDesde: '',
    FechaHasta: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Hook para navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // Llamamos a la API para registrar la solicitud de recuperación de hora médica
      await axios.post('http://127.0.0.1:8000/tasks/api/v1/tasks/', formData);
      setSuccessMessage('Solicitud de recuperación de hora médica enviada exitosamente.');
      setTimeout(() => setSuccessMessage(''), 3000); // Limpiamos el mensaje después de 3 segundos
      setFormData({ Nombre: '', Rangodefecha: '', FechaDesde: '', FechaHasta: '' }); // Limpiamos el formulario
    } catch (error) {
      setErrorMessage('Hubo un error al enviar la solicitud. Inténtalo de nuevo.');
      console.error('Error al enviar solicitud de recuperación de hora médica:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión y redirigir
    console.log('Cerrando sesión...');
    navigate('/login'); // Cambia '/login' por la ruta del formulario anterior
  };

  return (
    <div className="recuperar-hora-form">
      <h2>Formulario de Recuperación de Hora Médica</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            placeholder="Escribe tu Nombre"
            required
          />
        </div>

        <div className="form-group">
          <label>Comentario:</label>
          <input
            type="text"
            name="Rangodefecha"
            value={formData.Rangodefecha}
            onChange={handleChange}
            placeholder="Escribe el rango de fechas"
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha Desde:</label>
          <input
            type="date"
            name="FechaDesde"
            value={formData.FechaDesde}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha Hasta:</label>
          <input
            type="date"
            name="FechaHasta"
            value={formData.FechaHasta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout} // Manejar redirección
          >
            Cerrar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecuperarHoraForm;
