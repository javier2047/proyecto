import { useEffect } from 'react'
import { BiUserCheck } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { activate, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '@components/Spinner'

const ActivatePage = () => {
    const { uid, token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token
        }
        dispatch(activate(userData)) // Desencadena la acción para activar la cuenta
    }

    useEffect(() => {
        if (isError) {
            toast.error(message) // Muestra mensaje de error
        }

        if (isSuccess) {
            toast.success("¡Tu cuenta ha sido activada! Ahora puedes ingresar.") // Muestra mensaje de éxito
            navigate("/login") // Redirige al login
        }

        dispatch(reset()) // Limpia el estado después de manejar la activación

    }, [message, isError, isSuccess, navigate, dispatch])

    return (
        <div>
            <div className="container auth__container">
                <h1 className="main__title">
                    Activate Account <BiUserCheck />
                </h1>

                {isLoading && <Spinner />} {/* Muestra un spinner mientras está cargando */}

                <button
                    className="btn btn-accent btn-activate-account"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading} // Deshabilita el botón mientras está cargando
                >
                    Activate Account
                </button>
            </div>
        </div>
    )
}

export default ActivatePage
