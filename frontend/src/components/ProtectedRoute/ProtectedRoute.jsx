import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export const ProtectedRoute = ({ redirectTo = "/" }) => {
  const { user, loadingVerify } = useContext(AuthContext);

  if (loadingVerify) {
    return <div>Cargando ...</div>;
  }

  // Si user es un falsy (osea que no hay usuario), entonces redirige al usuario a la ruta "/", pero si user es un truthy, entonces se mostrará el componente Oulet
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
