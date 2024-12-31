import { TasksContext } from "./TasksContext";
import { useContext } from "react";

export const useTasks = () => useContext(TasksContext);
