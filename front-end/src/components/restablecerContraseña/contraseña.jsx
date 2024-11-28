import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { uid, token } = useParams(); // Captura uid y token desde la URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      // Primera solicitud: Cambiar contraseña
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/users/reset_password_confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, token, new_password: password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("¡Contraseña restablecida con éxito!");

        // Segunda solicitud: Enviar correo de confirmación
        await sendConfirmationEmail(result.email || "user@example.com"); // Usa el correo del usuario, si está disponible en la respuesta
      } else {
        setMessage(result.error || "Hubo un problema al restablecer la contraseña.");
      }
    } catch (error) {
      setMessage("Error en la solicitud. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para enviar correo de confirmación
  const sendConfirmationEmail = async (email) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/send_confirmation_email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage((prev) => `${prev} Se ha enviado un correo de confirmación.`);
      } else {
        console.error("Error al enviar el correo de confirmación.");
      }
    } catch (error) {
      console.error("Error en la solicitud del correo de confirmación:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "20px 40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#3a7bd5",
          }}
        >
          Restablecimiento de Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Nueva Contraseña:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu nueva contraseña"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Confirmar Contraseña:
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
              required
            />
          </div>
          {message && (
            <div
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
                color: message.includes("éxito") ? "#155724" : "#721c24",
                backgroundColor: message.includes("éxito")
                  ? "#d4edda"
                  : "#f8d7da",
                border: message.includes("éxito")
                  ? "1px solid #c3e6cb"
                  : "1px solid #f5c6cb",
              }}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: isLoading ? "#ccc" : "#3a7bd5",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Restablecer Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
