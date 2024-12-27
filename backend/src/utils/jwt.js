import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../config/config.js";

class TokenService {
  static generate({ payload = {} }) {
    try {
      return jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "1d" });
    } catch (error) {
      console.error("Error al generar el token: ", error.message);
      throw new Error("Error al generar el token.");
    }
  }

  static verify({ token }) {
    try {
      return jwt.verify(token, SECRET_KEY_JWT);
    } catch (error) {
      console.error("Error al verificar el token: ", error.message);
      throw new Error("Token inválido");
    }
  }
}

export default TokenService;
