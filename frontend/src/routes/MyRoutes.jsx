import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Profile } from "../pages/Profile/Profile";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { CreateTaskPage } from "../pages/CreateTaskPage/CreateTaskPage";
import { TasksProvider } from "../context/TasksContext/TasksProvider";
import { TasksPage } from "../pages/TasksPage/TasksPage";

export const MyRoutes = () => {
  return (
    <TasksProvider>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </TasksProvider>
  );
};
