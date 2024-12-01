import React from "react";
import "./styles.css";
import logo from "./logo-red-salud.png";

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="RedSalud Logo" className="logo" />
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <section className="hero">
          <h1>Bienvenidos a RedSalud</h1>
          <p>Comprometidos con tu salud y bienestar.</p>
          <button className="cta-button">Ingresar/Registrarse</button> {/* Cambié el texto aquí */}
        </section>
        <section id="services" className="section">
          <h2>Nuestros Servicios</h2>
          <p>Explora la amplia gama de servicios médicos que ofrecemos.</p>
        </section>
        <section id="about" className="section">
          <h2>Sobre Nosotros</h2>
          <p>RedSalud es la red de salud privada más grande de Chile.</p>
        </section>
        <section id="contact" className="section">
          <h2>Contáctanos</h2>
          <p>Estamos aquí para ayudarte con lo que necesites.</p>
        </section>
      </main>
  <footer className="footer">
    <p>&copy; 2024 RedSalud. Todos los derechos reservados.</p>
    </footer>
  </div>
  );
}

export default Home;
