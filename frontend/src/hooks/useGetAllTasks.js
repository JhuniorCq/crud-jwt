import axios from "axios";
import { useEffect, useState } from "react";
import { URL_SERVER } from "../utils/constants";

export const useGetAllTasks = () => {
  const [stateTasks, setStateTasks] = useState({
    responseTasks: null,
    loadingTasks: true,
    errorTasks: null,
  });

  const getTasks = async () => {
    setStateTasks((prev) => ({ ...prev, loadingTasks: true }));
    try {
      const { data } = await axios.get(`${URL_SERVER}/task`, {
        withCredentials: true,
      });

      setStateTasks({
        responseTasks: data,
        loadingTasks: false,
        errorTasks: null,
      });

      return data;
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;
      setStateTasks({
        responseTasks: null,
        loadingTasks: false,
        errorTasks: errorMessage,
      });

      return null;
    }
  };

  return {
    ...stateTasks,
    getTasks,
  };
};
