// frontend/src/components/Formulario.js
import React, { useState } from 'react';
import axios from 'axios';


const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    segundoapellido: '',
    fecha_inicio: '',
    hora_inicio: '',
    fecha_fin: '',
    hora_fin: '',
    especialidad: '',
    unidad: '',
    motivo: '',

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/forms/api/forms1/forms/', formData);
      alert('Formulario enviado exitosamente');
    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Error al enviar formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
      <input type="text" name="segundoapellido" placeholder="Segundo Apellido" value={formData.segundoapellido} onChange={handleChange} />
      <input type="date" name="fecha_inicio" placeholder="Fecha Inicio" value={formData.fecha_inicio} onChange={handleChange} required />
      <input type="time" name="hora_inicio" placeholder="Hora Inicio" value={formData.hora_inicio} onChange={handleChange} />
      <input type="date" name="fecha_fin" placeholder="Fecha Fin" value={formData.fecha_fin} onChange={handleChange} required />
      <input type="time" name="hora_fin" placeholder="Hora Fin" value={formData.hora_fin} onChange={handleChange} />
      <input type="text" name="especialidad" placeholder="Especialidad" value={formData.especialidad} onChange={handleChange} required />
      <input type="text" name="unidad" placeholder="Unidad" value={formData.unidad} onChange={handleChange} required />
      <input type="text" name="motivo" placeholder="Motivo" value={formData.motivo} onChange={handleChange} required />

      <button type="submit">Enviar Formulario</button>
    </form>
  );
};

export default Formulario;
