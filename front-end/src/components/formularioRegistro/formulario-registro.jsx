import { useState } from 'react';
import axios from 'axios';
import './formularioRegistro.css';
import { logout } from '@auth/authService';

const UserFormRegister = () => {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    segundoapellido: '',
    email: '',
    tipousuario: '',
    especialidad: '',
    rutsupervisor: '',
    emailjefe: '', 
    nombresupervisor: '',
    apellidosupervisor: '',
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
      if (!formData[key] && 
        key !== 'especialidad' && 
        key !== 'nombresupervisor' && 
        key !== 'apellidosupervisor' &&
        key!== 'rutsupervisor' && 
        key!== 'emailjefe') {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    // Validación de coincidencia de contraseñas
    if (formData.password !== formData.re_password) {
      newErrors.re_password = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    // Evitar enviar si hay errores
    if (Object.keys(newErrors).length > 0) {
      console.log('Errores detectados:', newErrors)
      return;
    }

    try {
      // Elimina el campo `re_password` antes de enviar la solicitud
      const { ...dataToSubmit } = formData;
      console.log('Datos enviados:', formData);

      // Enviar datos al backend
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/auth/users/', 
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 201) {
        alert('Usuario creado exitosamente');
        setFormData({
          rut: '',
          nombre: '',
          apellido: '',
          segundoapellido: '',
          email: '',
          tipousuario: '',
          especialidad: '',
          jefeacargo:'',
          rutsupervisor: '',
          emailjefe: '',
          nombresupervisor: '',
          apellidosupervisor: '',
          password: '',
          re_password: '',
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Error enviando formulario:', error.response?.data || error);
      alert('Error al enviar formulario');
    }
  };
  const handleLogout = () =>{
    logout();
    window.location.href = '/login';
  }
  return (
    
    <div className="form-container">
      {/* Botón de cerrar sesión */}
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
      <form className="form-register" onSubmit={handleSubmit}>
        <div className="form-title">Formulario de Registro</div>

        {/* Campos del formulario */}
        {['rut', 'nombre', 'apellido', 'segundoapellido', 'email'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              className={`controls ${errors[field] ? 'error' : ''}`}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
            {errors[field] && <span className="error-message">{errors[field]}</span>}
          </div>
        ))}

        {/* Campo tipo de usuario */}
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

        {/* Campos adicionales */}
        {['especialidad', 'emailjefe', 'rutsupervisor','nombresupervisor', 'apellidosupervisor'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              className="controls"
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}

        {/* Campos de contraseñas */}
        {['password', 're_password'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field === 'password' ? 'Contraseña' : 'Confirmar Contraseña'}:</label>
            <input
              className={`controls ${errors[field] ? 'error' : ''}`}
              type="password"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field === 'password' ? 'Contraseña' : 'Confirmar Contraseña'}
              required
            />
            {errors[field] && <span className="error-message">{errors[field]}</span>}
          </div>
        ))}

        <button className="submit-button" type="submit">
          
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default UserFormRegister;
