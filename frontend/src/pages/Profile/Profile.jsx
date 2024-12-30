import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import { usePost } from "../../hooks/usePost";
import { URL_SERVER } from "../../utils/constants";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export const Profile = () => {
  const {
    state: { user },
  } = useLocation();
  const navigate = useNavigate();
  const { user: userData, setUser } = useContext(AuthContext);
  const { responsePost, loadingPost, errorPost, postData } = usePost();

  const logout = () => {
    postData(`${URL_SERVER}/auth/logout`, {}, { withCredentials: true });
  };

  useEffect(() => {
    if (responsePost?.success) {
      setUser(null);
      navigate("/");
    }
  });

  return (
    <section>
      <h1>PERFIL DEL USUARIO</h1>

      <div>
        <p>ID: {user.id}</p>
        <p>Usuario: {user.username}</p>
      </div>

      <button onClick={logout}>Cerrar Sesión</button>
      {JSON.stringify(userData, null, 2)}
    </section>
  );
};
