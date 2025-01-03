import { useEffect, useId, useState } from "react";
import { InputForm } from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../schemas/taskSchema";
import "./CreateTaskPage.css";
import { useTasks } from "../../context/TasksContext/useTasks";

export const CreateTaskPage = () => {
  const id = useId();
  const {
    createTask,
    responseCreateTask,
    loadingCreateTask,
    errorCreateTask,
    resetCreateTask,
  } = useTasks();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data) => {
    console.log("Creando una tarea: ", data);
    await createTask({ task: data });
    reset();
  };

  const onError = (errors) => {
    alert("Por favor, complete correctamente los campos.");
  };

  useEffect(() => {
    if (responseCreateTask) {
      const timeout = setTimeout(() => {
        resetCreateTask();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [responseCreateTask]);

  return (
    <section>
      <h1>CREA UNA TAREA</h1>

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

        <button>Crear Tarea</button>

        {loadingCreateTask ? (
          <div>Creando la tarea ...</div>
        ) : errorCreateTask ? (
          <div>{errorCreateTask}</div>
        ) : (
          responseCreateTask && <div>Tarea creada con éxito.</div>
        )}
      </form>
    </section>
  );
};
