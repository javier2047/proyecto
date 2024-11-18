import Cancelaciones from '@routes/dashboard/Cancelaciones';
import Layout from '@components/dashboard/layout/Layout';
export default function DashboardPage() {
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
                            <p>prueba1</p>
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