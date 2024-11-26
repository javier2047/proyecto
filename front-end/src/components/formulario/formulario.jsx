// frontend/src/components/Formulario.js
import React, { useState } from 'react';
import axios from 'axios';
import logoRedSalud from './logo_red_salud_497cf0b50b.png';
import './formulario.css';

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
    motivo: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    window.location.href = '/login';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm('¿Está seguro de que desea enviar el formulario?');
    if (!isConfirmed) return;

    const wantsRecovery = window.confirm('¿Desea recuperar la hora médica?');
    if (wantsRecovery) {
      console.log("El usuario desea recuperar la hora médica.");
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:8000/forms/api/forms1/forms/', formData);
      setFormData({
        nombre: '',
        apellido: '',
        segundoapellido: '',
        fecha_inicio: '',
        hora_inicio: '',
        fecha_fin: '',
        hora_fin: '',
        especialidad: '',
        unidad: '',
        motivo: ''
      });
      setSuccessMessage('Formulario enviado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Ocurrió un error al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <img src={logoRedSalud} alt="Logo Red Salud" className="logo" />
        
        {/* Form Sections */}
        <section className="form-section">
          <h3>Información Personal</h3>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Segundo Apellido:</label>
            <input type="text" name="segundoapellido" placeholder="Segundo Apellido" value={formData.segundoapellido} onChange={handleChange} />
          </div>
        </section>

        <section className="form-section">
          <h3>Fechas y Horarios</h3>
          <div className="form-group">
            <label>Fecha Inicio:</label>
            <input type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Hora Inicio:</label>
            <input type="time" name="hora_inicio" value={formData.hora_inicio} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Fecha Fin:</label>
            <input type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Hora Fin:</label>
            <input type="time" name="hora_fin" value={formData.hora_fin} onChange={handleChange} />
          </div>
        </section>

        <section className="form-section">
          <h3>Información de Servicio</h3>
          <div className="form-group">
            <label>Especialidad:</label>
            <input type="text" name="especialidad" placeholder="Especialidad" value={formData.especialidad} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Unidad:</label>
            <input type="text" name="unidad" placeholder="Unidad" value={formData.unidad} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Motivo:</label>
            <input type="text" name="motivo" placeholder="Motivo" value={formData.motivo} onChange={handleChange} required />
          </div>
        </section>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Formulario'}
        </button>
      </form>
    </>

    
  );
};

export default Formulario;
