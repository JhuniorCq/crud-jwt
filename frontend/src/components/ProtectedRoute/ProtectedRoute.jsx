import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";

export const ProtectedRoute = ({ redirectTo = "/" }) => {
  const { user, loadingVerify } = useAuth();

  if (loadingVerify) {
    return <div>Cargando ...</div>;
  }

  // Si user es un falsy (osea que no hay usuario), entonces redirige al usuario a la ruta "/", pero si user es un truthy, entonces se mostrará el componente Oulet
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
