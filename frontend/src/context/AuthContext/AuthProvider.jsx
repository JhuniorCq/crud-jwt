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

  // Hacer un useEffect para verificar si el usuario está autenticado. Este useEffect se ejecutará en el primer renderizado de la aplicación (en donde hará que el "user" sea null (pero al inicio este ya es null xd)) y también cada vez que se haga F5. -> Este useEffect lo creo más que nada para que cada ves que sea haga F5, se verifique si el usuario está autenticado o no (con esto también vemos si se tiene la Cookie). Si el usuario está autenticado entonces pasaremos a la vista protegida, pero si no está autenticado, entonces nos quedaremos en la vista pública.

  useEffect(() => {
    const verifyUser = async () => {
      // Hacer una solicitud HTTP a la ruta "/auth/verify" para verificar si el usuario está autenticado. Esta solicitud llevará la Cookie con el token de acceso que me dió el Servidor cuando me autentiqué. Si el token es válido, el Servidor me devolverá los datos del usuario. Si el token no es válido, el Servidor me devolverá un error 401.
      // Si la solicitud es exitosa, entonces el "data" será el usuario autenticado. Si la solicitud no es exitosa, entonces el "data" será null.
      const response = await getVerify(`${URL_SERVER}/auth/verify`, {
        withCredentials: true,
      });

      const data = response?.data;

      console.log("ewfwewef", response);

      if (data) {
        console.log("data ya tiene valoor");
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
