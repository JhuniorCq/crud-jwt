import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio." }),
  email: z.string().email({ message: "El email no es válido." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

class UserValidations {
  static register({ user }) {
    return userSchema.safeParse(user);
  }

  static login({ user }) {
    const loginSchema = userSchema.omit({ username: true });

    return loginSchema.safeParse(user);
  }
}

export default UserValidations;
