import axios from "axios";
import { useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useUpdateTask = () => {
  const [stateUpdateTask, setStateUpdateTask] = useState({
    responseUpdateTask: null,
    loadingUpdateTask: false,
    errorUpdateTask: null,
  });

  const updateTask = async ({ id, task }) => {
    setStateUpdateTask((prev) => ({ ...prev, loadingUpdateTask: true }));
    try {
      const { data } = await axios.put(`${URL_SERVER}/task/${id}`, task, {
        withCredentials: true,
      });

      setStateUpdateTask({
        responseUpdateTask: data,
        loadingUpdateTask: false,
        errorUpdateTask: null,
      });

      return data;
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;

      setStateUpdateTask({
        responseUpdateTask: null,
        loadingUpdateTask: false,
        errorUpdateTask: errorMessage,
      });

      return null;
    }
  };

  const resetUpdateTask = () => {
    setStateUpdateTask({
      responseUpdateTask: null,
      loadingUpdateTask: false,
      errorUpdateTask: null,
    });
  };

  return {
    ...stateUpdateTask,
    updateTask,
    resetUpdateTask,
  };
};
