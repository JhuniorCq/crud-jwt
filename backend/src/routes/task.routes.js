import { Router } from "express";
import TaskController from "../controllers/task.controller.js";
const router = Router();

router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTask);
router.post("/", TaskController.createTask);
router.delete("/:id", TaskController.deleteTask);
router.put("/:id", TaskController.fullyUpdateTask);
router.patch("/:id", TaskController.partiallyUpdateTask);

export default router;
