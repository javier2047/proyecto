import React from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";



export const LoginForm = () => {
  return (
    <div className='wrapper'>
        <form action="POST">
         <h1>Bienvenido a RedSalud</h1>
         <div className='input-box'>
            <input type="text" placeholder='Usuario' required />
            <FaUser className='icon' />
        </div>
        <div className='input-box'>
            <input type="text" placeholder='Contraseña' required />
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