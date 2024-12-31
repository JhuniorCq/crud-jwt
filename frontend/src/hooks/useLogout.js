import axios from "axios";
import { useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useLogout = () => {
  const [stateLogout, setStateLogout] = useState({
    responseLogout: null,
    loadingLogout: false,
    errorLogout: null,
  });

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${URL_SERVER}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setStateLogout({
        responseLogout: data,
        loadingLogout: false,
        errorLogout: null,
      });

      return data;
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      setStateLogout({
        responseLogout: null,
        loadingLogout: false,
        errorLogout: errorMessage,
      });

      throw new Error(errorMessage);
    }
  };

  const resetStateLogout = () => {
    setStateLogout({
      responseLogout: null,
      loadingLogout: false,
      errorLogout: null,
    });
  };

  return {
    logout,
    resetStateLogout,
    ...stateLogout,
  };
};
