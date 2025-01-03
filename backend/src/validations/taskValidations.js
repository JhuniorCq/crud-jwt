import { z } from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El título de la tarea es obligatorio." }),
  description: z
    .string()
    .min(1, { message: "La descripción de la tarea es obligatoria." }),
  // date: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
  //   message: "La fecha debe tener el formato YYYY-MM-DD HH:MM:SS",
  // }),
});

class TaskValidations {
  static fullyValidate({ task }) {
    return taskSchema.safeParse(task);
  }

  static partiallyValidate({ task }) {
    // El .partial() hace que todas las propiedades del esquema sean opcionales
    return taskSchema.partial().safeParse(task);
  }
}

export default TaskValidations;
