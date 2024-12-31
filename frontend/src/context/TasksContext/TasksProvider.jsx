import { useState } from "react";
import { TasksContext } from "./TasksContext";
import { useGetAllTasks } from "../../hooks/useGetAllTasks";
import { useCreateTask } from "../../hooks/useCreateTask";

export const TasksProvider = ({ children }) => {
  // const [tasks, setTasks] = useState([]);
  const { responseTasks, loadingTasks, errorTasks } = useGetAllTasks();
  const { responseCreateTask, loadingCreateTask, errorCreateTask, createTask } =
    useCreateTask();

  return (
    <TasksContext.Provider
      value={{
        tasks: responseTasks?.data,
        loadingTasks,
        errorTasks,
        createTask,
        responseCreateTask,
        loadingCreateTask,
        errorCreateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
