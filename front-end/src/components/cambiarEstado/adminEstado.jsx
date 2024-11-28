import Layout from "@components/dashboard/layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminEstado() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "http://127.0.0.1:8000/forms/api/forms1/forms/";

  // Obtener datos de la API (GET)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const extractedData = response.data.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido,
          segundoApellido: item.segundoapellido,
          fecha: item.fecha_inicio,
          motivo: item.motivo,
          especialidad: item.especialidad || "General", // Valor predeterminado
          unidad: item.unidad || "Unidad desconocida", // Valor predeterminado
          estado: "pendiente",
        }));
        setData(extractedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejar la acción de aceptar/rechazar
  const handleAccion = async (index, accion) => {
    const confirmAction = window.confirm(`¿Estás seguro de que deseas ${accion.toLowerCase()} la solicitud?`);
    if (confirmAction) {
      try {
        const item = data[index];
        const updatedEstado = accion === "aceptar" ? "aceptado" : "rechazado";

        // Realizar el POST a la API con los datos requeridos
        await axios.post(apiUrl, {
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido,
          segundoApellido: item.segundoApellido,
          fecha_inicio: item.fecha,
          fecha_fin: item.fecha, // Ajustar según la lógica necesaria
          especialidad: item.especialidad,
          unidad: item.unidad,
          motivo: item.motivo,
          estado: updatedEstado,
        });

        // Actualizar el estado local para reflejar el cambio
        const newData = [...data];
        newData[index].estado = updatedEstado;
        setData(newData);

        alert(`Solicitud ${accion.toLowerCase()} correctamente.`);
      } catch (err) {
        console.error("Error al realizar la acción:", err);
        alert("Ocurrió un error al procesar la solicitud.");
      }
    }
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="py-4">
          <h2 className="text-center mb-4 mt-4">Administración de cancelaciones</h2>
          <div
            className="table-responsive"
            style={{
              maxHeight: "800px",
              overflowY: "scroll",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+,
            }}
          >
            <style>
              {`
                .table-responsive::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Segundo Apellido</th>
                  <th>Fecha</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.nombre}</td>
                    <td>{row.apellido}</td>
                    <td>{row.segundoApellido}</td>
                    <td>{row.fecha}</td>
                    <td>{row.motivo}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          row.estado === "pendiente"
                            ? "btn-warning"
                            : row.estado === "aceptado"
                            ? "btn-success"
                            : "btn-danger"
                        }`}
                        disabled
                      >
                        {row.estado}
                      </button>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAccion(index, "aceptar")}
                          disabled={row.estado !== "pendiente"}
                        >
                          Aceptar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleAccion(index, "rechazar")}
                          disabled={row.estado !== "pendiente"}
                        >
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminEstado;
