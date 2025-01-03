import { useEffect } from "react";
import { useTasks } from "../../context/TasksContext/useTasks";
import "./TasksPage.css";
import { Task } from "../../components/Task/Task";

export const TasksPage = () => {
  const { tasks, responseTasks, loadingTasks, errorTasks, getTasks } =
    useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  console.log("Estoy en la Lista de Tareas: ", tasks);

  return (
    <section className="tasks-page">
      <h1 className="tasks-page__title">LISTA DE TAREAS</h1>
      {loadingTasks ? (
        <div>Cargando las Tareas ...</div>
      ) : errorTasks ? (
        <div>{errorTasks}</div>
      ) : tasks.length === 0 ? (
        "No hay tareas para mostrar."
      ) : (
        <ul className="tasks-page__list">
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
