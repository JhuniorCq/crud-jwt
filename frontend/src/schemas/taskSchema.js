import { z } from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El título de la tarea es obligatorio." }),
  description: z
    .string()
    .min(1, { message: "La descripción de la tarea es obligatoria." }),
});

export { taskSchema };
