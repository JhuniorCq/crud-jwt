import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio." }),
  email: z.string().email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

const loginSchema = registerSchema.omit({ username: true });

export { registerSchema, loginSchema };
