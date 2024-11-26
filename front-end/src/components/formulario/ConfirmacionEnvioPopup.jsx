// ConfirmacionEnvioPopup.jsx
import React from 'react';

const ConfirmacionEnvioPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>Confirmación de Envío</h3>
        <p>¿Está seguro de que desea enviar el formulario?</p>
        <div className="popup-buttons">
          <button className="confirm-button" onClick={onConfirm}>Sí</button>
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionEnvioPopup;
