import { useState, useEffect } from "react";
import { fetchUserInfo } from "@services/getUserInfo";
import { getCancelaciones } from "@services/apiServiceDashboard";

function NavNotice() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [rutSupervisor, setRutSupervisor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        setIsLoading(true);

        // Obtener el rut del supervisor actual
        const userInfoArray = await fetchUserInfo();
        const userInfo = userInfoArray[0];
        const rut = userInfo.rut;
        setRutSupervisor(rut);

        // Obtener notificaciones (cancelaciones) filtradas por el rut del supervisor
        const result = await getCancelaciones();
        const notificacionesFiltradas = result.filter(
          (item) => item.rutsupervisor === rut && item.estado === "pendiente"
        );

        setNotificaciones(notificacionesFiltradas);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" data-bs-toggle="dropdown" href="#">
        <i className="bi bi-bell" />
        <span className="badge bg-primary badge-number">
          {notificaciones.length}
        </span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
          Tienes {notificaciones.length} nuevas notificaciones
          <a href="/estado">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              Ver todos
            </span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        {/* Listar las notificaciones dinámicamente */}
        {isLoading ? (
          <li className="notification-item">Cargando notificaciones...</li>
        ) : notificaciones.length === 0 ? (
          <li className="notification-item">No tienes notificaciones</li>
        ) : (
          notificaciones.map((notificacion, index) => (
            <li key={index} className="notification-item">
              <i className="bi bi-exclamation-circle text-primary"></i>
              <div>
                {/* Mostrar nombre y apellido */}
                <h4>{`${notificacion.nombre || "Sin nombre"} ${
                  notificacion.apellido || "Sin apellido"
                }`}</h4>

                {/* Mostrar fecha de inicio */}
                <p>
                  {notificacion.fecha_inicio || "Fecha de inicio no disponible"}
                </p>

                {/* Mostrar motivo */}
                <p>{notificacion.motivo || "Motivo no disponible"}</p>
              </div>
            </li>
          ))
        )}

        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="dropdown-footer">
          <a href="#">Ver más notificaciones</a>
        </li>
      </ul>
    </li>
  );
}

export default NavNotice;
