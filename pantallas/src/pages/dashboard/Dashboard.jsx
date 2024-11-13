import React, {useEffect, useState} from "react";
import { getCancelaciones } from "../../services/apiServiceDashboard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Dashboard() {
  const [data, setData] = useState([]); // Datos completos de la API
  const [filteredData, setFilteredData] = useState([]); // Datos filtrados para el gráfico
  const [filter, setFilter] = useState({ reason: "", date: "" }); // Estado para el filtro

  // Llamada a la API para obtener los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCancelaciones();
        setData(result);
        setFilteredData(result); // Inicia sin filtros
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  // Actualiza los datos filtrados cada vez que cambie el filtro
  useEffect(() => {
    applyFilter();
  }, [filter, data]);

  // Función para aplicar el filtro a los datos
  const applyFilter = () => {
    const filtered = data.filter(item => {
      const matchesReason = filter.reason ? item.reason === filter.reason : true;
      const matchesDate = filter.date ? item.date === filter.date : true;
      return matchesReason && matchesDate;
    });
    setFilteredData(filtered);
  };
   // Configuración del gráfico
   const chartData = {
    labels: filteredData.map(item => item.reason),
    datasets: [
      {
        label: "Cancelaciones",
        data: filteredData.map(item => item.count), // Ajusta según el campo que contenga el valor
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

    // Opciones del gráfico
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Gráfico de Cancelaciones",
        },
      },
    };
  
    // Manejar cambios en el filtro
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));
    };

  return (
      <div>
      <h2>Dashboard de Cancelaciones</h2>
      <p>Bienvenido al dashboard</p>

      {/* Controles de filtro */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Razón de Cancelación:
          <select name="reason" value={filter.reason} onChange={handleFilterChange}>
            <option value="">Todas</option>
            {[...new Set(data.map(item => item.reason))].map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Fecha:
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      {/* Gráfico de barras */}
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default Dashboard;
