import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Profile } from "../pages/Profile/Profile";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

export const MyRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute redirectTo="/" isAllowed={!!user} />}>
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/tasks" element={<Tasks />} /> */}
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
