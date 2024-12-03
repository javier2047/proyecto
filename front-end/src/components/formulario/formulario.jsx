import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

import logoRedSalud2 from './logo-redsalud.svg';
import RecuperarHoraPopup from './RecuperarHoraPopup';
import ConfirmacionEnvioPopup from './ConfirmacionEnvioPopup';
import './formulario.css';
import { fetchUserInfo } from '@services/getUserInfo';
import { logout } from '@auth/authService';
import { sendEmail } from '@services/sendEmailService';
import { sendEmailJefe } from '@services/sendEmailJefe';

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
};

const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`; // Formato "HH:MM:SS"
};
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
  const [userInfo, setuserInfo] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showRecuperarPopup, setShowRecuperarPopup] = useState(false);
  const [showConfirmacionEnvioPopup, setShowConfirmacionEnvioPopup] = useState(false);
  const email = userInfo.email;
  const emailjefe = userInfo.emailjefe; // esto es para el correo del jefe


  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        setLoading(true);
        const userInfoArray = await fetchUserInfo();
        const userInfo = userInfoArray[0];
        setuserInfo(userInfo);
        setFormData((prevFormData) => ({
          ...prevFormData,
          nombre: userInfo.nombre || '',
          apellido: userInfo.apellido || '',
          segundoapellido: userInfo.segundoapellido || '',
          especialidad: userInfo.especialidad || '',
          rutsupervisor: userInfo.rutsupervisor || '',
        }));
      } catch (err) {
        setError(err.message || 'No se pudo cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    logout();
    window.location.href = '/login';
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowConfirmacionEnvioPopup(true);  // Muestra el pop-up de confirmación de envío
  };
  const handleSendEmail = async () => {
    const responseMessage = await sendEmail(email);
    if (responseMessage) {
      console.log('Correo enviado exitosamente:', responseMessage)
    }
  };
  const handleSendEmailJefe = async() => {  // 1 de DICIEMBRE
    const responseMessage = await sendEmailJefe(emailjefe);
    if(responseMessage){
      console.log('Correo enviado al jefe exitosamente', responseMessage)
    }
  }
  const handleConfirmEnvio = async () => {
    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        fecha_inicio: formatDate(formData.fecha_inicio),
        hora_inicio: formatTime(formData.hora_inicio),
        fecha_fin: formatDate(formData.fecha_fin),
        hora_fin: formatTime(formData.hora_fin),
        estado: 'pendiente', // Campo requerido
        rutsupervisor: formData.rutsupervisor || 'nulo', // Valor predeterminado
      };
      await axios.post('http://localhost:8000/forms/api/forms1/forms/', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      //Esto de abajo es lo que toma el campo de correo para la api, corri un ejemplo y me dejo enviar el formulario.
      // Pero no envio el correo, intente un par de veces mas pero nada.
      await handleSendEmail();
      await handleSendEmailJefe();
      console.log('Enviando correo a:', email, emailjefe)
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
        motivo: '',
        rutsupervisor: '',
      });
      setSuccessMessage('Formulario enviado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);

      // Muestra el popup para recuperar la hora médica después de enviar el formulario
      setShowRecuperarPopup(true);

    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Ocurrió un error al enviar el formulario.', error);
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
      {/* Botón para cerrar sesión */}
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>

      {/* Mensaje de éxito */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Formulario principal */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Estado de carga */}
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              {/*Logo Redsalud SVG*/}
              <img src={logoRedSalud2} alt="Logo Red Salud" className="logo" />

              {/* Mensaje de error */}
              {error && <p className="error-message">{error}</p>}

              {/* Sección: Información Personal */}
              <section className="form-section">
                <h3>Información Personal</h3>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido:</label>
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Segundo Apellido:</label>
                  <input
                    type="text"
                    name="segundoapellido"
                    placeholder="Segundo Apellido"
                    value={formData.segundoapellido}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Sección: Fechas y Horarios */}
              <section className="form-section">
                <h3>Fechas y Horarios</h3>
                <div className="form-group">
                  <label>Fecha Inicio:</label>
                  <input
                    type="date"
                    name="fecha_inicio"
                    value={formData.fecha_inicio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hora Inicio:</label>
                  <input
                    type="time"
                    name="hora_inicio"
                    value={formData.hora_inicio}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha Fin:</label>
                  <input
                    type="date"
                    name="fecha_fin"
                    value={formData.fecha_fin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hora Fin:</label>
                  <input
                    type="time"
                    name="hora_fin"
                    value={formData.hora_fin}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Sección: Información de Servicio */}
              <section className="form-section">
                <h3>Información de Servicio</h3>
                <div className="form-group">
                  <label>Especialidad:</label>
                  <input
                    type="text"
                    name="especialidad"
                    placeholder="Especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unidad:</label>
                  <input
                    type="text"
                    name="unidad"
                    placeholder="Unidad"
                    value={formData.unidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Motivo:</label>
                  <input
                    type="text"
                    name="motivo"
                    placeholder="Motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>
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
              {/* Botón para enviar el formulario */}
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Formulario'}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );


};

export default Formulario;
