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
    password: '',
    re_password: '',
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

    // Validación de coincidencia de contraseñas
    if (formData.password !== formData.re_password) {
      newErrors.re_password = 'Las contraseñas no coinciden';
    }
    console.log(formData); // Log de los datos para asegurarte de que son correctos
    setErrors(newErrors);

    // Evitar enviar si hay errores
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      // Elimina el campo `re_password` antes de enviar la solicitud
      const { re_password, ...dataToSubmit } = formData;

      // Enviar datos al backend
      await axios.post('http://127.0.0.1:8000/api/v1/auth/users/?format=api', dataToSubmit);

      alert('Formulario enviado exitosamente');
      
      setFormData({
        rut: '',
        nombre: '',
        apellido: '',
        segundoapellido: '',
        email: '',
        tipousuario: '',
        password: '',
        re_password: '',
      });
      
      setErrors({});
    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Error al enviar formulario');
    }
  };

  return (
    <div className="form-container">
      <form className="form-register" onSubmit={handleSubmit}>
        <div className="form-title">Formulario de Registro</div>
  
        <div className="form-group">
          <label>RUT:</label>
          <input
            className={`controls ${errors.rut ? 'error' : ''}`}
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
            className={`controls ${errors.nombre ? 'error' : ''}`}
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
            className={`controls ${errors.apellido ? 'error' : ''}`}
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
            className={`controls ${errors.segundoapellido ? 'error' : ''}`}
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
            className={`controls ${errors.email ? 'error' : ''}`}
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
            className={`controls ${errors.tipousuario ? 'error' : ''}`}
            name="tipousuario"
            value={formData.tipousuario}
            onChange={handleChange}
          >
            <option value="">Seleccione Tipo de Usuario</option>
            <option value="medico">Médico</option>
            <option value="supervisor">Supervisor</option>
            <option value="administrativo">Administrador</option>
          </select>
          {errors.tipousuario && <span className="error-message">{errors.tipousuario}</span>}
        </div>
  
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            className={`controls ${errors.password ? 'error' : ''}`}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
  
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <input
            className={`controls ${errors.re_password ? 'error' : ''}`}
            type="password"
            name="re_password"
            value={formData.re_password}
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
          />
          {errors.re_password && <span className="error-message">{errors.re_password}</span>}
        </div>
  
        <button className="submit-button" type="submit">
          Crear Usuario
        </button>
      </form>
  
      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem('token'); // Elimina el token almacenado
          window.location.href = '/login'; // Redirige a la ruta de login
        }}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
  
};

export default UserFormRegister;
