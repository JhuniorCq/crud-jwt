import axios from "axios";
import { useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useVerify = () => {
  const [stateVerify, setStateVerify] = useState({
    responseVerify: null,
    loadingVerify: true,
    errorVerify: null,
  });

  const getVerify = async () => {
    try {
      const { data } = await axios.get(`${URL_SERVER}/auth/verify`, {
        withCredentials: true,
      });

      setStateVerify({
        responseVerify: data,
        loadingVerify: false,
        errorVerify: null,
      });

      return data;
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      console.error("", errorMessage);

      setStateVerify({
        responseVerify: null,
        loadingVerify: false,
        errorVerify: errorMessage,
      });

      return null;
    }
  };

  return {
    ...stateVerify,
    getVerify,
  };
};
