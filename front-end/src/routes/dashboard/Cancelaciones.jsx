import { useEffect, useState, useCallback } from "react";
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


function Cancelaciones() {
  const [data, setData] = useState([]); // Datos completos de la API
  const [labelsChart, setLabelsChart] = useState([]);//esto importa para filtros
  const [cantidadesLabels, setCantidadesLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = useCallback( async() =>{
    try {
      const result = await getCancelaciones();
      //console.log(result)
      setData(result);
      setIsLoading(false);
      // Creamos un Map para llevar el conteo de cada especialidad
    const contadorLabels = new Map();
    const nuevosLabels = new Set(labelsChart);

    // Recorremos los datos y agregamos los labels mientras contamos las repeticiones
    data.forEach((item) => {
      const { especialidad } = item;

      // Si ya tenemos la especialidad en el contador, incrementamos su valor
      if (contadorLabels.has(especialidad)) {
        contadorLabels.set(especialidad, contadorLabels.get(especialidad) + 1);
      } else {
        // Si es la primera vez que la encontramos, inicializamos con 1
        contadorLabels.set(especialidad, 1);
      }

      // Agregar al Set solo si la especialidad no está ya en labelsChart
      if (!nuevosLabels.has(especialidad)) {
        nuevosLabels.add(especialidad);
      }
    });

    // Creamos el array de labels a partir del Set, asegurándonos de que todos los elementos son únicos
    const nuevoLabelsChart = [...nuevosLabels];

    // Creamos el array de cantidades con el mismo orden de labelsChart
    const nuevoArrayCantidades = nuevoLabelsChart.map(label => contadorLabels.get(label) || 0);

    // Solo actualizamos los estados si hay algún cambio
    if (nuevoLabelsChart.length !== labelsChart.length) {
      setLabelsChart(nuevoLabelsChart);
      setCantidadesLabels(nuevoArrayCantidades);
    }

    //console.log("Labels:", nuevoLabelsChart);
    // Ejecutar el filtro después de un timeout



    } catch (error) {
      console.error("Error al obtener datos:", error);
    }

  },[labelsChart, data])

  // Llamada a la API para obtener los datos
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Elimina filter de las dependencias

  // Función para aplicar el filtro a los datos
  /*
    const applyFilter = useCallback(() => {
    const filtered = data.filter(item => {
      const matchesReason = filter.reason ? item.reason === filter.reason : true;
      const matchesDate = filter.date ? item.date === filter.date : true;
      return matchesReason && matchesDate;
    });
    setFilteredData(filtered);
  }, [data, filter.date, filter.reason]);
    // Actualiza los datos filtrados cada vez que cambie el filtro
  useEffect(() => {
    applyFilter();
  }, [filter, data, applyFilter]);
  */



  // Configuración del gráfico

  let chartData = {
    labels: labelsChart,
    datasets: [
      {
        label: "Cancelaciones",
        data: cantidadesLabels, // Ajusta según el campo que contenga el valor
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };


  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Esto permite un ajuste más preciso de la altura
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

  return (
    <div className="card">
      <div className="card-body">
        {/* Controles de filtro */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            Razón de Cancelación:
            <select name="reason">
              <option value="">Todas</option>
              {Object.keys(data[0]).map((key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>

          <label style={{ marginLeft: "20px" }}>
            Fecha:
            <input type="date" name="date" />
          </label>
        </div>

        {/* Gráfico de barras con altura ajustada */}
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
