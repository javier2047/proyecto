import Layout from "@components/dashboard/layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './adminEstado.css';


function AdminEstado() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null); // Estado para la solicitud seleccionada

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
          fecha2: item.fecha_fin,
          motivo: item.motivo,
          especialidad: item.especialidad || "General",
          unidad: item.unidad || "Unidad desconocida",
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

        await axios.post(apiUrl, {
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido,
          segundoApellido: item.segundoApellido,
          fecha_inicio: item.fecha,
          fecha_fin: item.fecha2,
          especialidad: item.especialidad,
          unidad: item.unidad,
          motivo: item.motivo,
          estado: updatedEstado,
        });

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

  // Manejar el clic para mostrar detalles
  const handleRowClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
  };

  const closeModal = () => {
    setSelectedSolicitud(null);
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
              scrollbarWidth: "none",
              msOverflowStyle: "none",
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
                  <th>Fecha Inicio</th>
                  <th>Fecha Termino</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
                    <td>{row.nombre}</td>
                    <td>{row.apellido}</td>
                    <td>{row.segundoApellido}</td>
                    <td>{row.fecha}</td>
                    <td>{row.fecha2}</td>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccion(index, "aceptar");
                          }}
                          disabled={row.estado !== "pendiente"}
                        >
                          Aceptar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccion(index, "rechazar");
                          }}
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
        {selectedSolicitud && (
          <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalles de la Solicitud</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Nombre:</strong> {selectedSolicitud.nombre}</p>
                  <p><strong>Apellido:</strong> {selectedSolicitud.apellido}</p>
                  <p><strong>Segundo Apellido:</strong> {selectedSolicitud.segundoApellido}</p>
                  <p><strong>Fecha Inicio:</strong> {selectedSolicitud.fecha}</p>
                  <p><strong>Fecha Fin:</strong> {selectedSolicitud.fecha2}</p>
                  <p><strong>Motivo:</strong> {selectedSolicitud.motivo}</p>
                  <p><strong>Especialidad:</strong> {selectedSolicitud.especialidad}</p>
                  <p><strong>Unidad:</strong> {selectedSolicitud.unidad}</p>
                  <p><strong>Estado:</strong> {selectedSolicitud.estado}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AdminEstado;
