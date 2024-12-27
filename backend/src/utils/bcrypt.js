import bcrypt from "bcrypt";

class Bcrypt {
  static async hash({ password, saltRounds }) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      return hashedPassword;
    } catch (error) {
      console.error("Error en hash en bcrypt.js: ", error.message);
      throw error;
    }
  }

  static async verify({ password, hashedPassword }) {
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    return isValidPassword;
  }
}

export default Bcrypt;
