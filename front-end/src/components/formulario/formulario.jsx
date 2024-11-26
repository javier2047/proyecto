import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import logoRedSalud from './logo_red_salud_497cf0b50b.png';
import RecuperarHoraPopup from './RecuperarHoraPopup';
import ConfirmacionEnvioPopup from './ConfirmacionEnvioPopup';
import './formulario.css';

const Formulario = () => {
  const navigate = useNavigate();  // Inicializa useNavigate
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
  const [showRecuperarPopup, setShowRecuperarPopup] = useState(false);
  const [showConfirmacionEnvioPopup, setShowConfirmacionEnvioPopup] = useState(false);

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

    setShowConfirmacionEnvioPopup(true);  // Muestra el pop-up de confirmación de envío
  };

  const handleConfirmEnvio = async () => {
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
      
      // Muestra el popup para recuperar la hora médica después de enviar el formulario
      setShowRecuperarPopup(true);

    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Ocurrió un error al enviar el formulario.');
    } finally {
      setLoading(false);
    }

    setShowConfirmacionEnvioPopup(false);  // Cierra el pop-up de confirmación de envío
  };

  const handleCancelEnvio = () => {
    setShowConfirmacionEnvioPopup(false);  // Cierra el pop-up sin hacer nada
  };

  const handleRecuperarConfirm = () => {
    console.log('Recuperando la hora médica...');
    setShowRecuperarPopup(false);

    // Redirige a la página de confirmación de la hora médica
    navigate('/recuperar-hora');  // Aquí debes colocar la ruta a la que deseas redirigir

    // Aquí puedes agregar la lógica para manejar la recuperación de la hora médica si es necesario
  };

  const handleRecuperarClose = () => {
    setShowRecuperarPopup(false);
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

      {/* Popup para recuperar hora médica */}
      <RecuperarHoraPopup 
        isOpen={showRecuperarPopup} 
        onClose={handleRecuperarClose} 
        onConfirm={handleRecuperarConfirm} 
      />

      {/* Popup de confirmación de envío */}
      <ConfirmacionEnvioPopup 
        isOpen={showConfirmacionEnvioPopup} 
        onClose={handleCancelEnvio} 
        onConfirm={handleConfirmEnvio} 
      />
    </>
  );
};

export default Formulario;
