import React, { useState } from "react";

function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    setIsLoading(true);

    try {
      // Llamada al backend
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/users/reset_password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok || response.status === 204) {
        setMessage("¡Solicitud enviada! Revisa tu correo electrónico.");
      } else {
        setMessage(result.error || "Hubo un problema al enviar la solicitud.");
      }
    } catch (error) {
      setMessage("¡Solicitud enviada! Revisa tu correo electrónico.");
      //setMessage("Error en la solicitud. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
            background: "rgba(255, 255, 255, 0.1)", // Fondo blanco con 80% de transparencia
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
            color: "#333",
          }}
        >
          Solicitar Restablecimiento de Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px", color: "#333" }}
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              required
            />
          </div>

          {/* Mensaje de error o éxito */}
          {message && (
            <div
              style={{
                marginBottom: "20px",
                padding: "10px",
                backgroundColor:
                  message === "¡Solicitud enviada! Revisa tu correo electrónico."
                    ? "#d4edda"
                    : "#f8d7da",
                color:
                  message === "¡Solicitud enviada! Revisa tu correo electrónico."
                    ? "#155724"
                    : "#721c24",
                borderRadius: "5px",
              }}
            >
              {message}
            </div>
          )}

          {/* Botón para enviar */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: isLoading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Solicitud"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestPasswordReset;