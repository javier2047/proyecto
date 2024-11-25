import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";

const Registrar = () => {
    const [formData, setFormData] = useState({
        "nombre": "",
        "apellido": "",
        "segundoapellido": "",
        "email": "",
        "tipousuario": "",
        "rut": "",
        "password": "",
        "re_password": "",
    });

    return (
        <>
            <div className="container auth__container">
                <h1 className="main__title">Registrar <BiUser /></h1>
                <form className="auth__form">
                
                <input type="text"
                        placeholder="nombre"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                        required
                    />
                <input type="text"
                        placeholder="apellido"
                        name="apellido"
                        onChange={handleChange}
                        value={apellido}
                        required
                    />
                <input type="text"
                        placeholder="segundoapellido"
                        name="segundoapellido"
                        onChange={handleChange}
                        value={segundoapellido}
                        required
                    />
                <input type="email"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required
                    />
                <input type="text"
                        placeholder="tipousuario"
                        name="tipousuario"
                        onChange={handleChange}
                        value={tipousuario}
                        required
                    />
                <input type="text"
                        placeholder="rut"
                        name="rut"
                        onChange={handleChange}
                        value={rut}
                        required
                    />
                <input type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                        required
                    />
                <input type="password"
                        placeholder="re_password"
                        name="re_password"
                        onChange={handleChange}
                        value={re_password}
                        required
                    />
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Register</button>
                </form>
            </div>
        </>
    );
};

export default Registrar;
