import axios from "axios";
import { useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useGetTask = () => {
  const [stateGetTask, setStateGetTask] = useState({
    responseGetTask: null,
    loadingGetTask: true,
    errorGetTask: null,
  });

  const getTask = async ({ id }) => {
    // setStateGetTask((prev) => ({ ...prev, loadingGetTask: true }));
    try {
      const { data } = await axios.get(`${URL_SERVER}/task/${id}`, {
        withCredentials: true,
      });

      setStateGetTask({
        responseGetTask: data,
        loadingGetTask: false,
        errorGetTask: null,
      });

      return data;
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;

      setStateGetTask({
        responseGetTask: null,
        loadingGetTask: false,
        errorGetTask: errorMessage,
      });

      return null;
    }
  };

  return {
    ...stateGetTask,
    getTask,
  };
};
