import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/usuariosred/api/login/", {
        rut,
        password,
      });

      const { token, tipousuario } = response.data;
      localStorage.setItem("token", token); // Guarda el token en el almacenamiento local

      // Redirigir según el tipo de usuario
      if (tipousuario === "medico") {
        navigate("@components/formulario/formulario.jsx");
      } else if (tipousuario === "supervisor") {
        navigate("@routes/dashboard/Pages.jsx");
      } else if (tipousuario === "administrativo") {
        navigate("@components/formularioRegistro/formulario-registro.jsx");
      } 
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>RUT:</label>
        <input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
