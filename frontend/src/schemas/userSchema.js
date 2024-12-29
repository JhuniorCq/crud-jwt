import { z } from "zod";

const registerSchema = z.object({
  registerUsername: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio." }),
  registerEmail: z.string().email({ message: "El email no es válido" }),
  registerPassword: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

const loginSchema = z.object({
  loginEmail: z.string().email({ message: "El email no es válido" }),
  loginPassword: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export { registerSchema, loginSchema };
