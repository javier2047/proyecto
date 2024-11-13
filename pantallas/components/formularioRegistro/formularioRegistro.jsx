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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/usuariosred/api/usuariosred/crear/', formData);
      alert("Usuario creado exitosamente");
    } catch (error) {
      console.error("Hubo un error al crear el usuario:", error);
    }
  };

  const handleEditButton = (e) => {
      if(confirm('¿Desea modificar algo?')){
       // fetch('')//Reedirecciona a la url para editar a los usuarios
        
      }
      else{
        console.log('no quiere')
      }


  }


  return (
    <div className="form-container">
      <form className="form-register" onSubmit={handleSubmit}>
        <div className="form-title">Formulario de Registro</div>
        
        <div className="form-group">
          <label>RUT :</label>
          <input className="controls" type="text" name="rut" value={formData.rut} onChange={handleChange} placeholder="RUT" />
        </div>
  
        <div className="form-group">
          <label>Nombre:</label>
          <input className="controls" type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
        </div>
  
        <div className="form-group">
          <label>Apellido:</label>
          <input className="controls" type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" />
        </div>
  
        <div className="form-group">
          <label>Segundo Apellido:</label>
          <input className="controls" type="text" name="segundoapellido" value={formData.segundoapellido} onChange={handleChange} placeholder="Segundo Apellido" />
        </div>
  
        <div className="form-group">
          <label>Email:</label>
          <input className="controls" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
  
        <div className="form-group">
          <label>Tipo de Usuario:</label>
          <select className="controls" name="tipousuario" value={formData.tipousuario} onChange={handleChange}>
            <option value="">Seleccione Tipo de Usuario</option>
            <option value="administrativo">Administrativo</option>
            <option value="supervisor">Supervisor</option>
            <option value="medico">Médico</option>
          </select>
        </div>
  
        <div className="form-group">
          <label>Especialidad:</label>
          <input className="controls" type="text" name="especialidad" value={formData.especialidad} onChange={handleChange} placeholder="Especialidad" />
        </div>
  
        <div className="form-group">
          <label>Jefe a Cargo:</label>
          <input className="controls" type="text" name="jefeacargo" value={formData.jefeacargo} onChange={handleChange} placeholder="Jefe a cargo" />
        </div>
  
        <div className="form-group">
          <label>Nombre Supervisor:</label>
          <input className="controls" type="text" name="nombresupervisor" value={formData.nombresupervisor} onChange={handleChange} placeholder="Nombre Supervisor" />
        </div>
  
        <div className="form-group">
          <label>Apellido Supervisor:</label>
          <input className="controls" type="text" name="apellidosupervisor" value={formData.apellidosupervisor} onChange={handleChange} placeholder="Apellido Supervisor" />
        </div>
  
        <div className="form-group">
          <label>Contraseña:</label>
          <input className="controls" type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} placeholder="Contraseña" />
        </div>
        
        <button  className="submit-button" type="submit" onClick={handleEditButton}>Crear Usuario</button>
      </form>
    </div>
  );
  
  
  
};


export default UserForm;