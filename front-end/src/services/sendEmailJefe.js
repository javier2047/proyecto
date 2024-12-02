export const sendEmailJefe = async (emailjefe) => {
    try {
      if (!emailjefe) {
        console.error("No hay email disponible para enviar");
        return;
      }
  
      const response = await fetch("http://127.0.0.1:8000/forms/api/emailjefe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailjefe }), // Incluye el email en el body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al enviar correo:", errorData.message);
        return;
      }
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data.message);
      return data.message; // Retorna el mensaje de éxito si todo va bien
    } catch (error) {
      console.error("Error durante la solicitud:", error.message);
    }
  };