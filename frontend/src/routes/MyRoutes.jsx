import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Profile } from "../pages/Profile/Profile";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute redirectTo="/" />}>
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/tasks" element={<Tasks />} /> */}
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
