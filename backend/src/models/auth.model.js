import pool from "../config/db.js";
import Bcrypt from "../utils/bcrypt.js";

class AuthModel {
  static async register({ id, username, password, email }) {
    try {
      // Verificar si el email ya está registrado
      const [resultSelect] = await pool.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );

      if (resultSelect.length > 0) {
        throw new Error("El email ya está registrado.");
      }

      // Registrar al usuario
      const [resultInsert] = await pool.query(
        "INSERT INTO user (id, username, password, email) VALUES (?, ?, ?, ?)",
        [id, username, password, email]
      );

      if (resultInsert.affectedRows === 0) {
        throw new Error("No se pudo registrar al usuario.");
      }

      return {
        id,
        username,
        email,
      };
    } catch (error) {
      console.error("Error en register en user.model.js: ", error.message);
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      // Verificar si el email está registrdo
      const [user] = await pool.query("SELECT * FROM user WHERE email = ?", [
        email,
      ]);

      if (user.length === 0) {
        throw new Error("El email no está registrado.");
      }

      console.log(user);

      // Verificar si la contraseña es correcta
      const isValidPassword = await Bcrypt.verify({
        password,
        hashedPassword: user[0].password,
      });

      if (!isValidPassword) {
        throw new Error("La contraseña es incorrecta.");
      }

      // Quitamos la contraseña del objeto que vamos a devolver
      delete user[0].password;

      return user[0];
    } catch (error) {
      console.error("Error en login en user.model.js", error.message);
      throw error;
    }
  }
}

export default AuthModel;
