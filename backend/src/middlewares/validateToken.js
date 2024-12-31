import TokenService from "../utils/jwt.js";

const validateToken = (req, res, next) => {
  try {
    const { access_token } = req.cookies;

    req.session = { user: null }; // Esto es para el objeto "session" esté disponible en todas las rutas subsiguientes

    if (!access_token) {
      const error = new Error("Acceso no autorizado.");
      error.statusCode = 401;
      throw error;
    }

    console.log("Validando el token ...");

    // Verifica la validez del token. Si el token es inválido, se lanza automáticamente un error.
    const data = TokenService.verify({ token: access_token });

    // Si el token es válido, los datos decodificados se almacenan en `req.session.user`. Esto permite acceder a la información del usuario en las rutas subsiguientes.
    req.session.user = data;

    // Si no hubo errores, se llama al siguiente middleware o controlador.
    next();
  } catch (error) {
    console.error(
      "Error en validateToken en validateToken.js: ",
      error.message
    );

    // Si ocurre un error, se asegura que `req.session.user` sea `null` para indicar que el token es inválido.
    req.session.user = null;
    next(error);
  }
};

export default validateToken;
