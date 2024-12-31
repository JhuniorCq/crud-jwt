import { useEffect } from "react";
import { useTasks } from "../../context/TasksContext/useTasks";
import "./TasksPage.css";

export const TasksPage = () => {
  const { responseTasks, loadingTasks, errorTasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section>
      <h1>LISTA DE TAREAS</h1>
      {loadingTasks ? (
        <div>Cargando las Tareas ...</div>
      ) : errorTasks ? (
        <div>{errorTasks}</div>
      ) : (
        responseTasks &&
        responseTasks.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))
      )}
    </section>
  );
};
