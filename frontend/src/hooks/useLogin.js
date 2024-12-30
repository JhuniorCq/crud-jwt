import axios from "axios";
import { useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useLogin = () => {
  const [stateLogin, setStateLogin] = useState({
    responseLogin: null,
    loadingLogin: false,
    errorLogin: null,
  });

  const login = async ({ credentials }) => {
    setStateLogin({ ...stateLogin, loading: true });
    try {
      const { data } = await axios.post(
        `${URL_SERVER}/auth/login`,
        credentials,
        {
          withCredentials: true,
        }
      );

      setStateLogin({
        responseLogin: data,
        loadingLogin: false,
        errorLogin: null,
      });

      return data; // El data contiene la respuesta del POST, y lo retorno para así poder utilizarlo inmediatamente después de llamar ala función login, ya que el estado "stateLogin" se actualizará luego de la ejecución de la función
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      setStateLogin({
        responseLogin: null,
        loadingLogin: false,
        errorLogin: errorMessage,
      });

      throw new Error(errorMessage); // Lanzo el error para que el componente que llame a "login" pueda manejarlo
    }
  };

  return {
    login,
    ...stateLogin,
  };
};
