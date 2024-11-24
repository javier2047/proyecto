import React from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";



export const LoginForm = () => {
  return (
    <div className='wrapper'>
        <form action="POST">
         <img src="https://b2597467.smushcdn.com/2597467/wp-content/uploads/logo-redsalud-dental-blanco.png?lossy=1&strip=1&webp=1" alt="LogoLogin" className="LogoLogin" />
         <div className='input-box'>
            <input type="Usuario" placeholder='Usuario' required />
            <FaUser className='icon' />
        </div>
        <div className='container'>
            
        </div>
        <div className='input-box'>
            <input type="Contraseña" placeholder='Contraseña' required />
            <RiLockPasswordFill className='icon' />
        </div>

        <div className='remember-forgot'>
            <label><input type="checkbox" />Recordarme</label>
            <a href="#">Olvide mi contraseña</a>
        </div>

        <button type="submit">Ingresar</button>

        <div className='register-link'>
            <p>¿No tienes una cuenta? <a href="#">Registrarse</a></p>
        </div>
    </form>
    </div>
  )
}

export default LoginForm