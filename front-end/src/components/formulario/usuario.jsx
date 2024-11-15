import React, { useState } from 'react';
import axios from 'axios';

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/usuario/api/usuariosred', formData);
      alert("Usuario creado exitosamente");
    } catch (error) {
      console.error("Hubo un error al crear el usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <input type="text" name="rut" value={formData.rut} onChange={handleChange} placeholder="RUT" />
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
      <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" />
      <input type="text" name="segundoapellido" value={formData.segundoapellido} onChange={handleChange} placeholder="Segundo Apellido" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      
      
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UserForm;
