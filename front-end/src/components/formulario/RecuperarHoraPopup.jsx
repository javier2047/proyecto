// frontend/src/components/RecuperarHoraPopup.js
import React from 'react';
import './recuperarHoraPopup.css';

const RecuperarHoraPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Recuperar Hora Médica</h3>
        <p>¿Desea recuperar la hora médica?</p>
        <div className="popup-buttons">
          <button className="confirm-button" onClick={onConfirm}>Sí</button>
          <button className="cancel-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default RecuperarHoraPopup;
