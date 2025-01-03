import axios from "axios";
import { useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useDeeleteTask = () => {
  const [stateDeleteTask, setStateDeleteTask] = useState({
    responseDeleteTask: null,
    loadingDeleteTask: false,
    errorDeleteTask: null,
  });

  const deleteTask = async ({ id }) => {
    setStateDeleteTask((prev) => ({ ...prev, loadingDeleteTask: true }));
    try {
      const { data } = await axios.delete(`${URL_SERVER}/task/${id}`, {
        withCredentials: true,
      });

      setStateDeleteTask({
        responseDeleteTask: data,
        loadingDeleteTask: false,
        errorDeleteTask: null,
      });

      return data;
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      console.error("Error en useDeleteTasj.js: ", errorMessage);

      setStateDeleteTask({
        responseDeleteTask: null,
        loadingDeleteTask: false,
        errorDeleteTask: errorMessage,
      });

      return null;
    }
  };

  return {
    ...stateDeleteTask,
    deleteTask,
  };
};
