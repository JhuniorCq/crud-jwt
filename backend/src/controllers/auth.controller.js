import { NODE_ENV, SALT_ROUNDS } from "../config/config.js";
import { createId } from "../utils/logic.js";
import AuthModel from "../models/auth.model.js";
import Bcrypt from "../utils/bcrypt.js";
import TokenService from "../utils/jwt.js";
import UserValidations from "../validations/userValidations.js";

class AuthController {
  static async register(req, res, next) {
    try {
      // Validar los datos enviados por el usuario
      const validatedUser = UserValidations.register({ user: req.body });
      if (!validatedUser.success) {
        const error = new Error(
          "Error en la validación de los datos del usuario."
        );
        error.statusCode = 400;
        throw error;
      }

      const { username, email, password } = validatedUser.data;

      // Hashear la contraseña
      const hashedPassword = await Bcrypt.hash({
        password,
        saltRounds: SALT_ROUNDS,
      });

      console.log("Contraseña hasheada", hashedPassword);

      // Agregando id al usuario
      const id = createId();

      // TODO: Implementar el modelo
      const user = await AuthModel.register({
        id,
        username,
        password: hashedPassword,
        email: email.toLowerCase(),
      });

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error en register en user.controller.js: ", error.message);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // Validar los datos enviados por el usuario
      const validatedUser = UserValidations.login({ user: req.body });

      if (!validatedUser.success) {
        const error = new Error(
          "Error en la validación de los datos del usuario."
        );
        error.statusCode = 400;
        throw error;
      }

      const { email, password } = validatedUser.data;

      const user = await AuthModel.login({
        email: email.toLowerCase(),
        password,
      });

      // Si las credenciales son correctas, se genera un token JWT
      const token = TokenService.generate({
        payload: { id: user.id, username: user.username },
      });

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24,
        })
        .json({
          success: true,
          data: user,
        });
    } catch (error) {
      console.error("Error en login en user.controller.js: ", error.message);
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.clearCookie("access_token").json({
        success: true,
        data: {
          message: "Cierre de sesión exitoso",
        },
      });
    } catch (error) {
      console.error("Error en logout en user.controller.js: ", error.message);
      next(error);
    }
  }

  // Ruta que verifica la existencia de la cookie y la validez del token (solo tiene esos propósitos)
  static async verify(req, res, next) {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        throw new Error();
      }

      // Verifica la validez del token. Si el token es inválido, se lanza automáticamente un error.
      const user = TokenService.verify({ token });

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      error.message = "Acceso no autorizado.";
      error.statusCode = 401;
      console.error("Error en profile en user.controller.js: ", error.message);
      next(error);
    }
  }
}

export default AuthController;
