import Cancelaciones from '@routes/dashboard/Cancelaciones';
import Layout from '@components/dashboard/layout/Layout';
import { getCancelaciones } from '../../services/apiServiceDashboard'
import { useEffect, useState } from 'react';
import { fetchUserInfo } from '@services/getUserInfo';
export default function DashboardPage() {
    const [totalCancelaciones, setTotalCancelaciones] = useState(0);
    const [highestCancelator, setHighestCancelator] = useState("");
    const [lastMonthCanc, setLastMonthCanc] = useState (0)
    const [rutSupervisor, setRutSupervisor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userInfoArray = await fetchUserInfo();
                const userInfo = userInfoArray[0]
                setRutSupervisor(userInfo.rut);


                const data = await getCancelaciones();
               
                
                const cancelacionesSubordinados = data.filter(
                    (item) => item.rutsupervisor === rutSupervisor  // filtrar cancelaciones de subordinados
                )
                setTotalCancelaciones(cancelacionesSubordinados.length);
                //Filtrar por ultimo mes
                const currentDate = new Date();
                const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1))

                const cancelationsLastMonth = cancelacionesSubordinados.filter((item) =>{
                    const initialDate = new Date(item.fecha_inicio);
                    return initialDate >= lastMonth
                });

                //contar cancelaciones por doctor = (nombre + apellido)
                const cancPerDoct = {};
                cancelationsLastMonth.forEach((item) =>{
                    const doctor = `${item.nombre} ${item.apellido}`;
                    cancPerDoct[doctor] = (cancPerDoct[doctor] || 0) + 1;
                });

                //encontrar al doctor con mas cancelaciones
                const [mostCancelDoc] = Object.entries(cancPerDoct).reduce(
                    (max, current) => (current[1] > max[1] ? current : max),
                    ["", 0]
                );

                //actualizar data
                setLastMonthCanc(cancelationsLastMonth.length);
                setHighestCancelator(mostCancelDoc);
                

            } catch (error) {
                console.error("Error al obtener las cancelaciones:", error);
            }
        };

        fetchData();
    }, [rutSupervisor]);
    return (
        <Layout>
            <div className='my-5'>
            <h2>Dashboard de Cancelaciones</h2>
            <p>Bienvenido al dashboard</p>
            {/* Seccion1 */}
            <div className='row mb-3'>
            <div className='col-12 mb-3 mb-lg-0 col-lg-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <p>Total de cancelaciones</p>
                            <h3>{totalCancelaciones}</h3> {/*Muestra aqui la suma*/}
                        </div>
                    </div>
                </div>
                <div className='col-12 mb-3 mb-lg-0 col-lg-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <p>Doctor con más cancelaciones en el último mes</p>
                            <h3>{highestCancelator || "Sin datos"}</h3>
                        </div>
                    </div>
                </div>
                <div className='col-12 mb-3 mb-lg-0 col-lg-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <p>Cancelaciones del Último Mes</p>
                            <h3>{lastMonthCanc}</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* Seccion2 */}
            <div className='row'>
                <div className='col-12 mb-3 mb-lg-0 col-lg-10 mx-auto'>
                        <Cancelaciones />
                </div>
            </div>
            </div>
        </Layout>
    )
}