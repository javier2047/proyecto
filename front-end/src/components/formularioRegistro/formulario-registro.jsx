import Header from "@components/dashboard/layout/Header";
import React, { useState } from 'react';
import axios from 'axios';
import './formularioregistro.css';

const UserFormRegister = () => {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    segundoapellido: '',
    email: '',
    tipousuario: '',
    especialidad: '',
    jefeacargo: '',
    nommbresupervisor: '',
    apellidosupervisor: '',
    password: '',
  });

  const [errors, setErrors] = useState({}); // Para almacenar mensajes de error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Limpia el error al escribir en el campo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    setErrors(newErrors);

    // Evitar enviar si hay errores
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/usuariosred/api/registrarusuariosred/', formData);
      alert('Formulario enviado exitosamente');
      setFormData({
        rut: '',
        nombre: '',
        apellido: '',
        segundoapellido: '',
        email: '',
        tipousuario: '',
        especialidad: '',
        jefeacargo: '',
        nommbresupervisor: '',
        apellidosupervisor: '',
        password: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Error al enviar formulario');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
            <Header />
    <div className="form-container">
      <form className="form-register" onSubmit={handleSubmit}>
        <div className="form-title">Formulario de Registro</div>

        <div className="form-group">
          <label>RUT:</label>
          <input
            className="controls"
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            placeholder="RUT"
          />
          {errors.rut && <span className="error-message">{errors.rut}</span>}
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            className="controls"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input
            className="controls"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
          />
          {errors.apellido && <span className="error-message">{errors.apellido}</span>}
        </div>

        <div className="form-group">
          <label>Segundo Apellido:</label>
          <input
            className="controls"
            type="text"
            name="segundoapellido"
            value={formData.segundoapellido}
            onChange={handleChange}
            placeholder="Segundo Apellido"
          />
          {errors.segundoapellido && <span className="error-message">{errors.segundoapellido}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            className="controls"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Tipo de Usuario:</label>
          <select
            className="controls"
            name="tipousuario"
            value={formData.tipousuario}
            onChange={handleChange}
          >
            <option value="">Seleccione Tipo de Usuario</option>
            <option value="administrativo">Administrativo</option>
            <option value="supervisor">Supervisor</option>
            <option value="medico">Médico</option>
          </select>
          {errors.tipousuario && <span className="error-message">{errors.tipousuario}</span>}
        </div>

        <div className="form-group">
          <label>Especialidad:</label>
          <input
            className="controls"
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            placeholder="Especialidad"
          />
          {errors.especialidad && <span className="error-message">{errors.especialidad}</span>}
        </div>

        <div className="form-group">
          <label>Jefe a Cargo:</label>
          <input
            className="controls"
            type="text"
            name="jefeacargo"
            value={formData.jefeacargo}
            onChange={handleChange}
            placeholder="Jefe a cargo"
          />
          {errors.jefeacargo && <span className="error-message">{errors.jefeacargo}</span>}
        </div>

        <div className="form-group">
          <label>Nombre Supervisor:</label>
          <input
            className="controls"
            type="text"
            name="nommbresupervisor"
            value={formData.nommbresupervisor}
            onChange={handleChange}
            placeholder="Nombre Supervisor"
          />
          {errors.nommbresupervisor && <span className="error-message">{errors.nommbresupervisor}</span>}
        </div>

        <div className="form-group">
          <label>Apellido Supervisor:</label>
          <input
            className="controls"
            type="text"
            name="apellidosupervisor"
            value={formData.apellidosupervisor}
            onChange={handleChange}
            placeholder="Apellido Supervisor"
          />
          {errors.apellidosupervisor && <span className="error-message">{errors.apellidosupervisor}</span>}
        </div>

        <div className="form-group">
          <label>password:</label>
          <input
            className="controls"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button className="submit-button" type="submit">
          Crear Usuario
        </button>
      </form>
    </div>
    </div>
  );
};

export default UserFormRegister;
