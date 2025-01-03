import { useForm } from "react-hook-form";
import "./UpdateTaskPage.css";
import { InputForm } from "../../components/InputForm/InputForm";
import { useEffect, useId } from "react";
import { useTasks } from "../../context/TasksContext/useTasks";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../schemas/taskSchema";

export const UpdateTaskPage = () => {
  // const id = useId();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });
  const {
    updateTask,
    responseUpdateTask,
    loadingUpdateTask,
    errorUpdateTask,
    getTask,
    responseGetTask,
    loadingGetTask,
    errorGetTask,
    resetUpdateTask,
  } = useTasks();

  const onSubmit = async (data) => {
    console.log("Modificando la tarea: ", data);
    await updateTask({ id, task: data });
    reset();
  };

  const onError = (errors) => {
    alert("Por favor, complete correctamente los campos.");
  };

  useEffect(() => {
    const loadingTask = async () => {
      const task = await getTask({ id });
      console.log("La tarea traída es: ", task);
      setValue("title", task.title);
      setValue("description", task.description);
    };

    loadingTask();
  }, []);

  useEffect(() => {
    if (responseUpdateTask) {
      const timeout = setTimeout(() => {
        resetUpdateTask();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [responseUpdateTask]);

  return (
    <section>
      <h1>MODIFICA LA TAREA N° {id}</h1>

      {loadingGetTask ? (
        <div>Cargando la tarea ...</div>
      ) : errorGetTask ? (
        <div>{errorGetTask}</div>
      ) : (
        responseGetTask && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <InputForm
              label="Título"
              name="title"
              id={`${id}-title`}
              placeholder="Título"
              type="text"
              register={register}
              errors={errors}
            />

            <InputForm
              label="Descripción"
              name="description"
              id={`${id}-description`}
              type="test"
              placeholder="Descripción"
              register={register}
              errors={errors}
            />

            <button>Modificar Tarea</button>

            {loadingUpdateTask ? (
              <div>Modificando la tarea ...</div>
            ) : errorUpdateTask ? (
              <div>{errorUpdateTask}</div>
            ) : (
              responseUpdateTask && (
                <div>Tarea N° {id} modificada con éxito</div>
              )
            )}
          </form>
        )
      )}
    </section>
  );
};
