import { useTasks } from "../../context/TasksContext/useTasks";
import "./Task.css";

export const Task = ({ id, title, description, date }) => {
  const {
    responseDeleteTask,
    loadingDeleteTask,
    errorDeleteTask,
    deleteTask,
    getTasks,
  } = useTasks();

  // const handleDeleteTask = async (id) => {
  //   await deleteTask({ id });
  //   getTasks(); // No es necesario ponerle el await porque no quiere esperarlo, ya que después de él no hay código que dependa de su resultado

  //   // El hecho de llamar a getTasks() es para actualizar la lista de tareas después de eliminar una tarea, pero esto implica hacer una petición GET al servidor para obtener la lista de tareas actualizada. Una forma más eficiente sería actualizar la lista de tareas desde el frontend sin hacer una petición al servidor, pero para eso tendríamos que tener acceso a la lista de tareas desde el componente Task, lo cual se puede lograr creando un estado en TaskProvider, el cual almacene la lista de tareas cuando se haga el GET "getTasks" al Servidor al cargar el componente "TasksPage"
  // };

  return (
    <li className="task">
      <h2 className="task__title">{title}</h2>
      <div className="task__buttons">
        <button className="task__button">Editar</button>
        <button className="task__button" onClick={() => deleteTask({ id })}>
          Eliminar
        </button>
      </div>
      <p className="task__description">{description}</p>
      <p>{date}</p>
    </li>
  );
};
