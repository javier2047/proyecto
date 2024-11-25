import React, { useState } from 'react';
import axios from 'axios';
import './formularioRegistro.css';


const UserForm = () => {
  const [formData, setFormData] = useState({ 
    rut: '',
    nombre: '',
    apellido: '',
    segundoapellido: '',
    email: '',
    tipousuario: '',
    especialidad: '',
    jefeacargo: '',
    nombresupervisor: '',
    apellidosupervisor: '',
    contraseña: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/usuariosred/api/registrarusuariosred/', formData);
      alert('Formulario enviado exitosamente');
    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Error al enviar formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="rut" placeholder="rut" value={formData.rut} onChange={handleChange} required />
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
      <input type="text" name="segundoapellido" placeholder="Segundo Apellido" value={formData.segundoapellido} onChange={handleChange} />
      <input type="text" name="email" placeholder="email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="tipousuriao" placeholder="tipousuario" value={formData.tipousuario} onChange={handleChange} />
      <input type="text" name="especialidad" placeholder="especialidad" value={formData.especialidad} onChange={handleChange} required />
      <input type="text" name="jefeacargo" placeholder="jefeacargo" value={formData.jefeacargo} onChange={handleChange} />
      <input type="text" name="nombresupervisor" placeholder="Especialidad" value={formData.nombresupervisor} onChange={handleChange} required />
      <input type="text" name="apellidosupervisor" placeholder="Unidad" value={formData.apellidosupervisor} onChange={handleChange} required />
      <input type="text" name="contraseña" placeholder="Motivo" value={formData.contraseña} onChange={handleChange} required />

      <button type="submit">Enviar Formulario</button>
    </form>
  );
};
export default UserForm;