import React, { useState } from "react";
import Layout from "@components/dashboard/layout/Layout";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
    } else {
      setMessage("Contraseña restablecida con éxito.");
    }
  };

  return (
    <Layout>
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
            color: "#3a7bd5",
          }}
        >
          Restablecimiento de Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Correo Electrónico:
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
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
              required
            />
          </div>
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
              backgroundColor: "#3a7bd5",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Restablecer Contraseña
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
}

export default ResetPassword;