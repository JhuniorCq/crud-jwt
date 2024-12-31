import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useLogout } from "../../hooks/useLogout";
import { URL_SERVER } from "../../utils/constants";
import { useVerify } from "../../hooks/useVerify";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { responseLogin, loadingLogin, errorLogin, login, resetStateLogin } =
    useLogin();
  const {
    responseLogout,
    loadingLogout,
    errorLogout,
    logout,
    resetStateLogout,
  } = useLogout();

  const { responseVerify, loadingVerify, errorVerify, getVerify } = useVerify();

  const handleLogin = async ({ credentials }) => {
    try {
      const { data } = await login({ credentials });
      setUser(data);
      navigate("/profile", { state: { user: data } });
      resetStateLogin();
    } catch (error) {
      console.error("Error en el login: ", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Elimina al usuario del contexto
      navigate("/"); // Redirige al inicio
      resetStateLogout(); // Resetea el estado del logout
    } catch (error) {
      console.error("Error en el logout: ", error.message);
      setError(error.message);
    }
  };

  // Este useEffect es el que se encarga de verificar si es que el Cliente tiene la Cookie con el token de acceso que le dió el Servidor cuando se hizo el login satisfactoriamente. Si el Cliente tiene la Cookie, entonces el Servidor le devolverá los datos del usuario autenticado (estos están en el payload del token). Si el Cliente no tiene la Cookie o el token es inválido, entonces el Servidor devolverá una respuesta con un código de ERROR 401. -> Lo cual hará que el "data" sea null
  useEffect(() => {
    const verifyUser = async () => {
      // Hacer una solicitud HTTP a la ruta "/auth/verify" para verificar si el usuario está autenticado. Esta solicitud llevará la Cookie con el token de acceso que me dió el Servidor cuando me autentiqué. Si el token es válido, el Servidor me devolverá los datos del usuario. Si el token no es válido, el Servidor me devolverá un error 401.
      // Si la solicitud es exitosa, entonces el "data" contendrá los datos almacenados en el token. Si la solicitud no es exitosa, entonces el "data" será null.
      const { data } = await getVerify(`${URL_SERVER}/auth/verify`, {
        withCredentials: true,
      });

      if (data) {
        setUser(data);
      }
    };

    verifyUser();
  }, []);

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
        loadingVerify,
        errorVerify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
