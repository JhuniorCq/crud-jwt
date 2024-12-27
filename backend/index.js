import express from "express";
import cors from "cors";
import morgan from "morgan";
import handleError from "./src/middlewares/handleError.js";
import userRouter from "./src/routes/auth.routes.js";
import { PORT } from "./src/config/config.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true, // Esta propiedad habilita el intercambios de cookies entre el cliente y el servidor
  })
);
app.use(express.json()); // Middleware para convertir el cuerpo de la solicitud en un Objeto JS
app.use(cookieParser()); // Middleware para convertir las cookies en un Objeto JS
app.use(morgan("dev"));

// app.get("/", (req, res) => {});

// RUTAS PARA USUARIOS
app.use("/auth", userRouter);

// RUTA PARA MANEJAR ERROR 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// MIDDELWARE PARA MANEJAR ERRORES
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
