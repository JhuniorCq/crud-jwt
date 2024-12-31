import { useTasks } from "../../context/TasksContext/useTasks";
import "./TasksPage.css";

export const TasksPage = () => {
  const { tasks, loadingTasks, errorTasks } = useTasks();
  console.log(tasks);
  return (
    <section>
      <h1>LISTA DE TAREAS</h1>
      {loadingTasks ? (
        <div>Cargando las Tareas ...</div>
      ) : errorTasks ? (
        <div>{errorTasks}</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))
      )}
    </section>
  );
};
