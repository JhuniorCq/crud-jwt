import { useLocation } from "react-router-dom";
import "./Profile.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export const Profile = () => {
  const {
    state: { user },
  } = useLocation();
  const { user: userData, logout } = useContext(AuthContext);

  console.log("Estoy en profile: ", user, userData);

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
