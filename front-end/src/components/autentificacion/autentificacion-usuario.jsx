import React, { useState } from "react";
import "./autentificacion.css"; // Importar el archivo CSS personalizado

const UserActivation = () => {
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleActivation = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/users/activation/", { //conexion con la api.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Cuenta activada exitosamente.");
        setIsSuccess(true);
      } else {
        setMessage(data.detail || "Error en la activación.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Ocurrió un error al conectarse con el servidor.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="activation-container">
      <h1 className="activation-title">Activación de Usuario</h1>
      <form className="activation-form" onSubmit={handleActivation}>
        <label htmlFor="uid" className="activation-label">Usuario (ID del Usuario):</label>
        <input
          type="text"
          id="uid"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="Ingresa tu usuario"
          required
          className="activation-input"
        />

        <label htmlFor="token" className="activation-label">código de Activación:</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Ingresa tu código"
          required
          className="activation-input"
        />

        <button type="submit" className="activation-button">
          Activar Cuenta
        </button>
      </form>

      {message && (
        <div
          className={`activation-message ${isSuccess ? "success" : "error"}`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default UserActivation;
