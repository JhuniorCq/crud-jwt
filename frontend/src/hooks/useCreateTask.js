import axios from "axios";
import { useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useCreateTask = () => {
  const [stateCreateTask, setStateCreateTask] = useState({
    responseCreateTask: null,
    loadingCreateTask: false,
    errorCreateTask: null,
  });

  const createTask = async ({ task }) => {
    setStateCreateTask((prev) => ({ ...prev, loadingCreateTask: true }));
    try {
      const { data } = await axios.post(`${URL_SERVER}/task`, task, {
        withCredentials: true,
      });

      setStateCreateTask({
        responseCreateTask: data,
        loadingCreateTask: false,
        errorCreateTask: null,
      });
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      console.error("Error en createTask en useCreateTasj.js: ", errorMessage);
      setStateCreateTask({
        responseCreateTask: null,
        loadingCreateTask: false,
        errorCreateTask: errorMessage,
      });
    }
  };

  const resetCreateTask = () => {
    setStateCreateTask({
      responseCreateTask: null,
      loadingCreateTask: false,
      errorCreateTask: null,
    });
  };

  return {
    ...stateCreateTask,
    createTask,
    resetCreateTask,
  };
};
