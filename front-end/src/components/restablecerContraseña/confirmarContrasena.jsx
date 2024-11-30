import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPasswordConfirm } from "../../features/auth/authSlice";
import Spinner from "@components/Spinner";
import { AiFillLock } from 'react-icons/ai'

const ResetPasswordPageConfirm = () => {
  const { uid, token } = useParams();
  const [formData, setFormData] = useState({
    'new_password': "",
    're_new_password': "",
  });

  const { new_password, re_new_password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      uid,
      token,
      new_password,
      re_new_password,
    };

    dispatch(resetPasswordConfirm(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/login");
      toast.success("Tu contraseña se ha actualizado con exito!");
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <div className="container auth__container">
        <h1 className="main__title">
          Re-establece tu contraseña <AiFillLock />
        </h1>

        {isLoading && <Spinner />}

        <form className="auth__form">
          <input
            type="password"
            placeholder="Contraseña"
            name="new_password"
            onChange={handleChange}
            value={new_password}
            required
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            name="re_new_password"
            onChange={handleChange}
            value={re_new_password}
            required
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Reset Contraseña
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPageConfirm;
