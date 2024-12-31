import axios from "axios";
import { useState } from "react";

export const useManualGet = () => {
  const [stateGet, setStateGet] = useState({
    responseGet: null,
    loadingGet: false,
    errorGet: null,
  });

  const getData = async (url, options = {}) => {
    setStateGet({ ...stateGet, loadingGet: true });
    try {
      const { data } = await axios.get(url, options);

      setStateGet({
        responseGet: data,
        loadingGet: false,
        errorGet: null,
      });
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      console.error("", errorMessage);

      setStateGet({
        responseGet: null,
        loadingGet: false,
        errorGet: errorMessage,
      });
    }
  };

  return {
    ...stateGet,
    getData,
  };
};
