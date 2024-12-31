import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export const ProtectedRoute = ({ isAllowed, redirectTo = "/" }) => {
  const { loadingVerify } = useContext(AuthContext);

  if (loadingVerify) {
    return <div>Cargando ...</div>;
  }

  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
