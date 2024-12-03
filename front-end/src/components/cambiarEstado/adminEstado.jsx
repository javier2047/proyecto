import Layout from "@components/dashboard/layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUserInfo } from "@services/getUserInfo";

function AdminEstado() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  let [rutSupervisor, setRutSupervisor] = useState("");
  const apiUrl = "http://127.0.0.1:8000/forms/api/forms1/forms/";

  const cambiarEstado = async (id, nuevoEstado, index) => {
    // Realizamos la solicitud PATCH a la API
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/forms/api/forms1/forms/${id}/`,{ estado: nuevoEstado }
      );
      console.log("Estado actualizado en la base de datos:", response.data);
      const updatedData = [...data];
      updatedData[index].estado = nuevoEstado;
      setData(updatedData);
      console.log("Datos actualizados:", data);


      alert(`Estado cambiado a "${nuevoEstado}" exitosamente`);
    } catch (err) {
      console.error("Error al actualizar el estado:", err);
      alert("No se pudo cambiar el estado, porfavor intentelo nuevamente.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Paso 1: Obtener el rutSupervisor
        const userInfoArray = await fetchUserInfo();
        const userInfo = userInfoArray[0]; // Asegúrate de que fetchUserInfo devuelva un arreglo válido
        const fetchedRutSupervisor = userInfo?.rut;

        if (!fetchedRutSupervisor) {
          throw new Error("No se pudo obtener el RUT del supervisor actual.");
        }

        // Almacenar en el estado
        setRutSupervisor(fetchedRutSupervisor);

        // Paso 2: Obtener las cancelaciones
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
          estado: item.estado || "Pendiente",
          rutsupervisor: item.rutsupervisor,
        }));

        // Filtrar las solicitudes por el rut del supervisor
        const filteredData = extractedData.filter(
          (item) => item.rutsupervisor === rutSupervisor
        );

        setData(filteredData); // Establecer los datos filtrados
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]); // Ejecuta el efecto una sola vez al montar el componente
  // Manejar la acción de aceptar/rechazar
  const handleAccion = async (index, accion) => {
    console.log("Índice recibido:", index);
    console.log("Data completa:", data);
  
    // Validar el índice y el objeto en el arreglo
    if (!data[index]) {
      console.error("Elemento en el índice no encontrado. Verifica el índice:", index);
      return;
    }
  
    const item = data[index];
    console.log("Elemento seleccionado:", item);
  
    if (!item.id) {
      console.error("El elemento no tiene un ID válido:", item);
      return;
    }
    const confirmAction = window.confirm(
      `¿Estás seguro de que deseas ${accion.toLowerCase()} la solicitud?`
    );
    if (confirmAction) {
      const updatedEstado = accion === "aceptar" ? "aceptado" : "rechazado";
      await cambiarEstado(item.id, updatedEstado, index);
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
          <h2 className="text-center mb-4 mt-5">
            Administración de cancelaciones
          </h2>
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
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(row)}
                      style={{ cursor: "pointer" }}
                    >
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
                              e.preventDefault();
                              e.stopPropagation();
                              handleAccion(index, "aceptar");
                            }}
                          >
                            Aceptar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAccion(index, "rechazar");
                            }}
                          >
                            Rechazar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No hay solicitudes para mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {selectedSolicitud && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalles de la Solicitud</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Nombre:</strong> {selectedSolicitud.nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {selectedSolicitud.apellido}
                  </p>
                  <p>
                    <strong>Segundo Apellido:</strong>{" "}
                    {selectedSolicitud.segundoApellido}
                  </p>
                  <p>
                    <strong>Fecha Inicio:</strong> {selectedSolicitud.fecha}
                  </p>
                  <p>
                    <strong>Fecha Fin:</strong> {selectedSolicitud.fecha2}
                  </p>
                  <p>
                    <strong>Motivo:</strong> {selectedSolicitud.motivo}
                  </p>
                  <p>
                    <strong>Especialidad:</strong>{" "}
                    {selectedSolicitud.especialidad}
                  </p>
                  <p>
                    <strong>Unidad:</strong> {selectedSolicitud.unidad}
                  </p>
                  <p>
                    <strong>Estado:</strong> {selectedSolicitud.estado}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
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
