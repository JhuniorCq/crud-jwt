import { TasksContext } from "./TasksContext";
import { useGetAllTasks } from "../../hooks/useGetAllTasks";
import { useCreateTask } from "../../hooks/useCreateTask";
import { useDeeleteTask } from "../../hooks/useDeleteTask";
import { useState } from "react";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { responseTasks, loadingTasks, errorTasks, getTasks } =
    useGetAllTasks();
  const {
    responseCreateTask,
    loadingCreateTask,
    errorCreateTask,
    createTask,
    resetCreateTask,
  } = useCreateTask();
  const { responseDeleteTask, loadingDeleteTask, errorDeleteTask, deleteTask } =
    useDeeleteTask();

  const handleGetTasks = async () => {
    const { data } = await getTasks();

    if (data) {
      setTasks(data);
    }

    // Dato: No es necesario un try catch, ya que el error se maneja en el custom hook useGetAllTasks. Y si un error ocurre, este se atrapa en el catch(error) de useGetAllTasks, y useGetAllTasks retornará un null, con lo cual deberemos trabajar acá en handleGetTasks. (ESTO TAMBIÉN VALE PARA LAS DEMÁS FUNCIONES -> handleCreateTask, handleDeleteTask, etc.)
  };

  const handleCreateTask = async ({ task }) => {
    await createTask({ task });
    // Acá ya no es necesario actualizar el estado task, porque cuando vayamos a la vista de tareas, se hará un GET al Servidor para obtener la lista de tareas actualizada. Este GET se hará en el primer renderizado de la vista de tareas
  };

  const handleDeleteTask = async ({ id }) => {
    const { data } = await deleteTask({ id });

    if (data) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks: handleGetTasks,
        responseTasks: responseTasks?.data,
        loadingTasks,
        errorTasks,
        createTask: handleCreateTask,
        responseCreateTask,
        loadingCreateTask,
        errorCreateTask,
        resetCreateTask,
        deleteTask: handleDeleteTask,
        responseDeleteTask,
        loadingDeleteTask,
        errorDeleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
