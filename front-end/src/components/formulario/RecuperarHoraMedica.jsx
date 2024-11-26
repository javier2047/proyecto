// frontend/src/components/RecuperarHoraMedica.js
import React, { useState } from 'react';
import './recuperarHoraMedica.css'; // Importa el archivo CSS

const RecuperarHoraMedica = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    motivo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    alert('Formulario enviado para recuperación de hora médica');
  };

  return (
    <div className="recuperar-container">
      <h2>Formulario de Recuperación de Hora Médica</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
          />
        </div>

        <div className="form-group">
          <label>Motivo:</label>
          <input
            type="text"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            placeholder="Motivo de recuperación"
            required
          />
        </div>

        <button type="submit">Enviar Recuperación</button>
      </form>
    </div>
  );
};

export default RecuperarHoraMedica;
