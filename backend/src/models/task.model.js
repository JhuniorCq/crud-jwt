import pool from "../config/db.js";

class TaskModel {
  static async getAllTasks({ idUser }) {
    try {
      const [tasks] = await pool.query("SELECT * FROM task WHERE id_user = ?", [
        idUser,
      ]);

      return tasks;
    } catch (error) {
      console.error("Error en getAllTasks en task.model.js: ", error.message);
      throw error;
    }
  }

  static async getTask({ id }) {
    try {
      const [task] = await pool.query("SELECT * FROM task WHERE id = ?", [id]);

      if (task.length === 0) {
        const error = new Error("La tarea no existe.");
        error.statusCode = 404;
        throw error;
      }

      return task[0];
    } catch (error) {
      console.error("Error en getTask en task.model.js: ", error.message);
      throw error;
    }
  }

  static async createTask({ idUser, title, description, date }) {
    try {
      const [result] = await pool.query(
        "INSERT INTO task (title, description, date, id_user) VALUES (?, ?, ?, ?)",
        [title, description, date, idUser]
      );

      if (result.affectedRows === 0) {
        throw new Error("No se pudo crear la tarea.");
      }

      return {
        id: result.insertId,
        title,
        description,
        date,
      };
    } catch (error) {
      console.error("Error en createTask en task.model.js: ", error.message);
      throw error;
    }
  }

  static async deleteTask({ id }) {
    try {
      // Verificar si la tarea existe
      const [task] = await pool.query("SELECT * FROM task WHERE id = ?", [id]);

      if (task.length === 0) {
        const error = new Error("La tarea no existe.");
        error.statusCode = 404;
        throw error;
      }

      // Eliminar la tarea
      const [result] = await pool.query("DELETE FROM task WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
        throw new Error("No se pudo eliminar la tarea.");
      }

      return {
        id,
      };
    } catch (error) {
      console.error("Error en deleteTask en task.model.js: ", error.message);
      throw error;
    }
  }

  static async fullyUpdateTask({ id, title, description, date }) {
    try {
      // Verificar si la tarea existe
      const [task] = await pool.query("SELECT * FROM task WHERE id = ?", [id]);

      if (task.length === 0) {
        const error = new Error("La tarea no existe.");
        error.statusCode = 404;
        throw error;
      }

      // Actualizar la tarea
      const [result] = await pool.query(
        "UPDATE task SET title = ?, description = ? WHERE id = ?",
        [title, description, id]
      );

      if (result.affectedRows === 0) {
        throw new Error("No se pudo actualizar la tarea");
      }

      return {
        id,
        title,
        description,
        date,
      };
    } catch (error) {
      console.error(
        "Error en fullyUpdateTask en task.model.js: ",
        error.message
      );
      throw error;
    }
  }

  static async partiallyUpdateTask({ id, taskData }) {
    try {
      // Verificar si la tarea existe
      const [task] = await pool.query("SELECT * FROM task WHERE id = ?", [id]);

      if (task.length === 0) {
        const error = new Error("La tarea no existe.");
        error.statusCode = 404;
        throw error;
      }

      // Crear dinámicamente la consulta de actualización
      const fields = [];
      const values = [];

      // Recorremos los datos validados y construimoos una porción de la consulta
      Object.keys(taskData).forEach((field) => {
        fields.push(`${field} = ?`); // Usamos el ? en vez del valor correspondiente, para evitar una inyección SQL
        values.push(taskData[field]); // Añadimos el valor correspondiente
      });

      // Si no hay campos para actualizar, lanzamos un error
      if (fields.length === 0) {
        const error = new Error("No hay campos para actualizar.");
        error.statusCode = 400;
        throw error;
      }

      // Agregamos el id al final del array de valores
      values.push(id);

      // Actualizamos la tarea
      const [result] = await pool.query(
        `UPDATE task SET ${fields.join(", ")} WHERE id = ?`,
        values
      );

      return {
        id,
        ...taskData,
      };
    } catch (error) {
      console.error(
        "Error en partiallyUpdateTask en task.model.js: ",
        error.message
      );
      throw error;
    }
  }
}

export default TaskModel;
