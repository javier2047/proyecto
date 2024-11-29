import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/jwt/create/", {
                rut,
                password,
            });

            // Guardar tokens
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            // Obtener el rol del usuario
            const role = response.data.user.role;

            // Redirigir según el rol
            if (role === "supervisor") {
                navigate("@routes/dashboard/Page.jsx");
            } else if (role === "administrador") {
                navigate("@components/formularioRegistro/formulario-registro");
            } else if (role === "medico") {
                navigate("@components/formulario/formulario.jsx");
            } else {
                setError("Rol de usuario no reconocido");
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Error al iniciar sesión");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>RUT:</label>
                    <input
                        type="text"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        required
                        placeholder="Ej: 12345678-9"
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;
