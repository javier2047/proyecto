import axios from 'axios';

export const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('token'); // Recupera el token

    if (!token) {
      throw new Error('Token no disponible. Por favor, inicie sesión nuevamente.');
    }

    // Solicitud al backend para obtener información del usuario
    const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/', {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado
      },
    });
    console.log('fetchUserInfo: Datos obtenidos:', response.data);
    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    console.error('Error en fetchUserInfo:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
