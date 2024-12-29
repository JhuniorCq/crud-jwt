import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<h1>PERFIL DEL USUARIO</h1>} />
    </Routes>
  );
};
