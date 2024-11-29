import Layout from "@components/dashboard/layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminOpciones() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "http://127.0.0.1:8000/tasks/api/v1/tasks";

  // Obtener datos de la API (GET)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const extractedData = response.data.map((item) => ({
          nombre: item.Nombre,
          rangoDeFecha: item.Rangodefecha,
          fechaDesde: item.FechaDesde,
          fechaHasta: item.FechaHasta,
          done: item.done,
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
          <h2 className="text-center mb-4 mt-4">Listado de Tareas</h2>
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
                  <th>Rango de Fecha</th>
                  <th>Fecha Desde</th>
                  <th>Fecha Hasta</th>

                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.nombre}</td>
                    <td>{row.rangoDeFecha}</td>
                    <td>{row.fechaDesde || "No especificada"}</td>
                    <td>{row.fechaHasta || "No especificada"}</td>



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

export default AdminOpciones;
