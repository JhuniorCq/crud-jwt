import { NODE_ENV, SALT_ROUNDS } from "../config/config.js";
import { createId } from "../utils/logic.js";
import UserModel from "../models/user.model.js";
import Bcrypt from "../utils/bcrypt.js";
import TokenService from "../utils/jwt.js";

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      // Validar los datos enviados por el usuario

      // Hashear la contraseña
      const hashedPassword = await Bcrypt.hash({
        password,
        saltRounds: SALT_ROUNDS,
      });

      console.log("Contraseña hasheada", hashedPassword);

      // Agregando id al usuario
      const id = createId();

      // TODO: Implementar el modelo
      const user = await UserModel.register({
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
      const { email, password } = req.body;

      // Validar los datos enviados por el usuario

      const user = await UserModel.login({
        email: email.toLowerCase(),
        password,
      });

      // Si las credenciales son correctas, se genera un token JWT
      const token = TokenService.generate({
        id: user.id,
        username: user.username,
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

  static async profile(req, res, next) {
    try {
      res.send("Estás en profile");
    } catch (error) {
      console.error("Error en profile en user.controller.js: ", error.message);
      next(error);
    }
  }
}

export default UserController;
