import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useLogout } from "../../hooks/useLogout";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { responseLogin, loadingLogin, errorLogin, login } = useLogin();

  const { responseLogout, loadingLogout, errorLogout, logout } = useLogout();

  const handleLogin = async ({ credentials }) => {
    try {
      const { data } = await login({ credentials });
      setUser(data);
      navigate("/profile", { state: { user: data } });
    } catch (error) {
      console.error("Error en el login: ", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Elimina al usuario del contexto
      navigate("/"); // Redirige al inicio
    } catch (error) {
      console.error("Error en el logout: ", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: handleLogin,
        responseLogin,
        loadingLogin,
        errorLogin,
        logout: handleLogout,
        responseLogout,
        loadingLogout,
        errorLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
