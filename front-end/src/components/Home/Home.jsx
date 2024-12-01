import React from 'react';
import './Home.css'; // Importa el archivo CSS
import backgroundImage from '@components/Home/TABANCURA-1024x527.jpeg'
import logoImage from '@components/Home/logo-red-salud.png'

const Home = () => {
  return (
    <div className="home-container">
      <div className="background">
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>
      <header className="header">
        <img src={logoImage} alt="Red Salud Logo" className="logo" />
        <nav className="navigation">
          <a href="#services">Servicios</a>
          <a href="#about">Nosotros</a>
          <a href="#contact">Contacto</a>
          <button className="cta-button">Agenda tu cita</button>
        </nav>
      </header>
      <main className="content">
        <h1 className="main-title">Bienvenido a Red Salud</h1>
        <p className="subtitle">Cuidamos de ti y de los tuyos con la mejor atención médica.</p>
        <div className="search-bar">
          <input type="text" placeholder="Busca un servicio o especialista..." />
          <button className="search-button">Buscar</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
