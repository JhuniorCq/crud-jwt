import TaskModel from "../models/task.model.js";
import TaskValidations from "../validations/taskValidations.js";
import dayjs from "dayjs";

class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskModel.getAllTasks({});

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      console.error(
        "Error en getAllTasks en task.controller.js: ",
        error.message
      );
      next(error);
    }
  }

  static async getTask(req, res, next) {
    try {
      const { id } = req.params;

      const task = await TaskModel.getTask({ id });

      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      console.error("Error en getTask en task.controller.js: ", error.message);
      next(error);
    }
  }

  static async createTask(req, res, next) {
    try {
      // Obtener la fecha y hora actual
      const date = dayjs().format("YYYY-MM-DD HH:mm:ss");

      // Validar los datos enviados por el usuario
      const validatedTask = TaskValidations.fullyValidate({
        task: { ...req.body, date },
      });

      if (!validatedTask.success) {
        console.log(validatedTask.error.issues);
        const error = new Error("Error en la validación de los datos.");
        error.statusCode = 400;
        throw error;
      }

      const { title, description } = validatedTask.data;

      const task = await TaskModel.createTask({ title, description, date });

      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      console.error(
        "Error en createTask en task.controller.js: ",
        error.message
      );
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { id } = req.params;

      const task = await TaskModel.deleteTask({ id });

      res.json({
        success: true,
        data: task,
        message: "Tarea eliminada correctamente.",
      });
    } catch (error) {
      console.error(
        "Error en deleteTask en task.controller.js: ",
        error.message
      );
      next(error);
    }
  }

  static async fullyUpdateTask(req, res, next) {
    try {
      const { title, description, date } = req.body;

      // Validar los datos enviados por el usuario
      const validatedTask = TaskValidations.fullyValidate({
        task: { ...req.body },
      });

      if (!validatedTask.success) {
        const error = new Error("Error en la validación de datos.");
        error.statusCode = 400;
        throw error;
      }

      const { id } = req.params;

      const task = await TaskModel.fullyUpdateTask({
        id,
        ...validatedTask.data,
      });

      res.json({
        success: true,
        data: task,
        message: "Tarea actualizada completamente.",
      });
    } catch (error) {
      console.error(
        "Error en fullyUpdateTask en task.controller.js: ",
        error.message
      );
      next(error);
    }
  }

  static async partiallyUpdateTask(req, res, next) {
    try {
      // Validar los datos enviados por el usuario
      const validatedTask = TaskValidations.partiallyValidate({
        task: { ...req.body },
      });

      if (!validatedTask.success) {
        const error = new Error("Error en la validación de los datos.");
        error.statusCode = 400;
        throw error;
      }

      const { id } = req.params;

      const task = await TaskModel.partiallyUpdateTask({
        id,
        taskData: validatedTask.data,
      });

      res.json({
        success: true,
        data: task,
        message: "Tarea actualizada parcialmente.",
      });
    } catch (error) {
      console.error(
        "Error en partiallyUpdateTask en task.controller.js: ",
        error.message
      );
      next(error);
    }
  }
}

export default TaskController;
