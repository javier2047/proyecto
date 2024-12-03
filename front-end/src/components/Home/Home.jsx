import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./HomeEstilo.css";
import logo from "./logo-red-salud.png";

function Home() {
  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para manejar el clic del botón
  const handleNavigate = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="RedSalud Logo" className="logo" />
        </div>
        <nav className="nav">
        </nav>
      </header>
      <main className="main">
        <section className="hero">
          <h1>Bienvenidos a cancelaciones RedSalud</h1>
          <p>Comprometidos con tu salud y bienestar.</p>
          {/* Botón con funcionalidad de navegación */}
          <button className="cta-button" onClick={handleNavigate}>
            Ingresar
          </button>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 RedSalud. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
