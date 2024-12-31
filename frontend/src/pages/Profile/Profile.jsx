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

  // Crear un useEffect que se ejecute en el primer renderizado. Este useEffect debe traer los datos del usuarios, y esta Solicitud HTTP llevará la Cookie con el token de acceso que me dió el Servidor cuando me autentiqué. Si el token es válido, el Servidor me devolverá los datos del usuario. Si el token no es válido, el Servidor me devolverá un error 401.

  // El useEffect sería necesario acá porque se quiere mostrar los datos del usuario, pero si no se quisieran mostrar esos datos, no es necesario hacer el useEffect

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
