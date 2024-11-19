import Cancelaciones from '@routes/dashboard/Cancelaciones';
import Layout from '@components/dashboard/layout/Layout';
import { getCancelaciones } from '../../services/apiServiceDashboard'
import { useEffect, useState } from 'react';
export default function DashboardPage() {
    const [totalCancelaciones, setTotalCancelaciones] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCancelaciones();
                setTotalCancelaciones(data.length);
            } catch (error) {
                console.error("Error al obtener las cancelaciones:", error);
            }
        };

        fetchData();
    }, []);
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
                            <p>prueba2</p>
                        </div>
                    </div>
                </div>
                <div className='col-12 mb-3 mb-lg-0 col-lg-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <p>prueba3</p>
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