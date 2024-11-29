import { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Cancelaciones() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [labelsChart, setLabelsChart] = useState([]);
  const [cantidadesLabels, setCantidadesLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterField1, setFilterField1] = useState("especialidad"); // Primer campo para filtrar
  const [filterValue1, setFilterValue1] = useState(""); // Primer valor del filtro
  const [filterField2, setFilterField2] = useState("unidad"); // Segundo campo para filtrar
  const [filterValue2, setFilterValue2] = useState(""); // Segundo valor del filtro

  // Carga inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCancelaciones();
        setData(result);
        setFilteredData(result); // Inicialmente, muestra todos los datos
        setIsLoading(false);
        console.log(result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Actualiza el gráfico cuando los datos filtrados cambian
  useEffect(() => {
    let tempData = [...data];

    // Aplicar filtro 1
    if (filterValue1) {
      tempData = tempData.filter((item) => item[filterField1] === filterValue1);
    }

    // Aplicar filtro 2
    if (filterValue2) {
      tempData = tempData.filter((item) => item[filterField2] === filterValue2);
    }

    setFilteredData(tempData);

    // Generar datos para el gráfico
    if (tempData.length > 0) {
      const contadorLabels = new Map();
      const nuevosLabels = new Set();

      tempData.forEach((item) => {
        const value = item[filterField1]; // Usa el primer campo para las etiquetas
        contadorLabels.set(value, (contadorLabels.get(value) || 0) + 1);
        nuevosLabels.add(value);
      });

      const nuevoLabelsChart = [...nuevosLabels];
      const nuevoArrayCantidades = nuevoLabelsChart.map(
        (label) => contadorLabels.get(label) || 0
      );

      setLabelsChart(nuevoLabelsChart);
      setCantidadesLabels(nuevoArrayCantidades);
    } else {
      setLabelsChart([]);
      setCantidadesLabels([]);
    }
  }, [data, filterField1, filterValue1, filterField2, filterValue2]);

  // Manejo de cambios en los filtros
  const handleFilterFieldChange = (field, isPrimary) => {
    if (isPrimary) {
      setFilterField1(field);
      setFilterValue1(""); // Resetea el valor al cambiar el campo
    } else {
      setFilterField2(field);
      setFilterValue2(""); // Resetea el valor al cambiar el campo
    }
  };

  const handleFilterValueChange = (value, isPrimary) => {
    if (isPrimary) {
      setFilterValue1(value);
    } else {
      setFilterValue2(value);
    }
  };

  let chartData = {
    labels: labelsChart,
    datasets: [
      {
        label: `Cancelaciones (${filterField1}: ${filterValue1 || "Todos"}${
          filterValue2 ? `, ${filterField2}: ${filterValue2}` : ""
        })`, // Leyenda dinámica
        data: cantidadesLabels,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Gráfico de Cancelaciones" },
    },
  };

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ marginBottom: "20px" }}>
          {/* Selección del primer campo para filtrar */}
          <label>
            Filtrar por (1):
            <select
              name="filterField1"
              value={filterField1}
              onChange={(e) => handleFilterFieldChange(e.target.value, true)}
            >
              <option value="especialidad">Especialidad</option>
              <option value="unidad">Unidad</option>
              <option value="motivo">Motivo</option>
              <option value="estado">Estado</option>
            </select>
          </label>

          {/* Selección del valor para el primer filtro */}
          <label style={{ marginLeft: "20px" }}>
            Valor (1):
            <select
              name="filterValue1"
              value={filterValue1}
              onChange={(e) => handleFilterValueChange(e.target.value, true)}
            >
              <option value="">Todos</option>
              {[...new Set(data.map((item) => item[filterField1]))].map(
                (value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          {/* Selección del segundo campo para filtrar */}
          <label>
            Filtrar por (2):
            <select
              name="filterField2"
              value={filterField2}
              onChange={(e) => handleFilterFieldChange(e.target.value, false)}
            >
              <option value="especialidad">Especialidad</option>
              <option value="unidad">Unidad</option>
              <option value="motivo">Motivo</option>
              <option value="estado">Estado</option>
            </select>
          </label>

          {/* Selección del valor para el segundo filtro */}
          <label style={{ marginLeft: "20px" }}>
            Valor (2):
            <select
              name="filterValue2"
              value={filterValue2}
              onChange={(e) => handleFilterValueChange(e.target.value, false)}
            >
              <option value="">Todos</option>
              {[...new Set(data.map((item) => item[filterField2]))].map(
                (value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        {/* Gráfico de barras */}
        {!isLoading && (
          <div>
            <Bar data={chartData} options={options} height={500} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cancelaciones;
